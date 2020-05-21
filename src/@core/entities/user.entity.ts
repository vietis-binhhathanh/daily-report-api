import { BeforeInsert, Column, Entity, OneToMany } from 'typeorm';
import { AbstractBaseEntity } from '../../@base/entity/abstract-base-entity';
import { IsEmail } from 'class-validator';
import { classToPlain, Exclude } from 'class-transformer';

import * as bcrypt from 'bcryptjs';
import { TaskEntity } from './task.entity';

@Entity('users')
export class UserEntity extends AbstractBaseEntity {
  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ name: 'full_name' })
  fullName: string;

  @Column()
  dob: Date;

  @Column({ default: false })
  admin: boolean;

  @Column({ default: null, nullable: true })
  avatar: string | null;

  @OneToMany(
    type => TaskEntity,
    task => task.author,
  )
  tasks: TaskEntity[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(attempt: string) {
    return await bcrypt.compare(attempt, this.password);
  }

  toJSON() {
    return classToPlain(this);
  }
}
