import { Exclude } from "class-transformer";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Invoice } from "./Invoice.entity";


export enum UserRole {
    USER = "user",
    BILLER="Biller"
}

//user entity
@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    user_id: string

    @Column({type: "varchar", length: 10, unique: true})
    phone_number: string

    @Exclude()
    @Column()
    password: string

    @Column()
    name: string

    @Column({type: 'enum', enum: UserRole, default: UserRole.USER})
    role: UserRole

    @OneToMany(()=>Invoice,(invoice)=>invoice.user)
    invoices:Invoice[];
}