import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('varchar')
    username: string
    
    @Column('varchar')
    password: string
    
    @Column('varchar')
    salt: string
}