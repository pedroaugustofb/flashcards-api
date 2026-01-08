import { Body, Controller, HttpStatus, Inject, Post, Res } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { UsersService } from './users.service'
import { CreateUserDto } from './dtos/create-user.dto'
import { Public } from 'src/infra/decorators/auth/public.decorator'

@Controller('users')
@ApiTags('users')
export class UsersController {
  @Inject(UsersService)
  private usersService: UsersService

  @Post()
  @Public()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async createUser(@Res() response, @Body() user: CreateUserDto) {
    const createdUser = await this.usersService.createUser(user)

    return response.status(HttpStatus.CREATED).json({
      status: 201,
      message: 'User has been created successfully',
      createdUser,
    })
  }
}
