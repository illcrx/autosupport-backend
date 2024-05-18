import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './entities/role.entity';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  async create(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
    return this.roleService.create(createRoleDto);
  }

  @Get()
  async findAll(): Promise<Role[]> {
    return this.roleService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Role> {
    return this.roleService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.roleService.remove(id);
  }
}
