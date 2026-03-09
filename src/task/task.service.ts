import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './task.entity';

@Injectable()
export class TaskService {
  private tasks: Task[] = [];
  private id = 1;

  create(createTaskDto: CreateTaskDto): Task {
    const newTask: Task = {
      id: this.id++,
      title: createTaskDto.title,
      description: createTaskDto.description,
      completed: createTaskDto.completed ?? false,
    };

    this.tasks.push(newTask);
    return newTask;
  }

  findAll(): Task[] {
    return this.tasks;
  }

  findOne(id: number): Task {
    const task = this.tasks.find((task) => task.id === id);

    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    return task;
  }

  update(id: number, updateTaskDto: UpdateTaskDto): Task {
    const task = this.findOne(id);

    Object.assign(task, updateTaskDto);

    return task;
  }

  remove(id: number): { message: string } {
    const task = this.findOne(id);

    this.tasks = this.tasks.filter((t) => t.id !== task.id);

    return { message: `Task with id ${id} deleted successfully` };
  }
}