import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Version,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserPayloadDto } from './dto';
import { loadMessages } from 'src/utils/load-messages.util';
import { STATUS_CODES } from 'src/common/status-codes';
import { AuthGuard } from 'src/common/guards/auth/auth.guard';

const MESSAGES = loadMessages();

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Version('1')
  @HttpCode(STATUS_CODES.OK.code)
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: STATUS_CODES.OK.code,
    description: MESSAGES.USER.CREATE_USER_SUCCESS,
  })
  @ApiResponse({
    status: STATUS_CODES.BAD_REQUEST.code,
    description: MESSAGES.USER.CREATE_USER_FAILURE,
  })
  async createUser(@Body() createUserDto: UserPayloadDto) {
    const createStatus: any = await this.userService.createUser(
      createUserDto.googleId,
      createUserDto.email,
      createUserDto.name,
    );

    if (createStatus.data) {
      return {
        ...STATUS_CODES.OK,
        data: createStatus.data || null,
        message: MESSAGES.USER.CREATE_USER_SUCCESS,
      };
    } else {
      return {
        ...STATUS_CODES.BAD_REQUEST,
        message: MESSAGES.USER.CREATE_USER_FAILURE,
      };
    }
  }

  @Get()
  @UseGuards(AuthGuard)
  @Version('1')
  @HttpCode(STATUS_CODES.OK.code)
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: STATUS_CODES.OK.code,
    description: MESSAGES.USER.GET_USERS_SUCCESS,
  })
  @ApiResponse({
    status: STATUS_CODES.BAD_REQUEST.code,
    description: MESSAGES.USER.GET_USERS_FAILURE,
  })
  async getUsers() {
    const getStatus: any = await this.userService.getAllUsers();

    if (getStatus.data) {
      return {
        ...STATUS_CODES.OK,
        data: getStatus.data || null,
        message: MESSAGES.USER.GET_USERS_SUCCESS,
      };
    } else {
      return {
        ...STATUS_CODES.BAD_REQUEST,
        message: MESSAGES.USER.GET_USERS_FAILURE,
      };
    }
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @Version('1')
  @HttpCode(STATUS_CODES.OK.code)
  @ApiOperation({ summary: 'Update a user by id' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({
    status: STATUS_CODES.OK.code,
    description: MESSAGES.USER.UPDATE_USER_BY_ID_SUCCESS,
  })
  @ApiResponse({
    status: STATUS_CODES.BAD_REQUEST.code,
    description: MESSAGES.USER.UPDATE_USER_BY_ID_FAILURE,
  })
  async updateUser(
    @Param('email') email: string,
    @Body() updateUser: { name: string },
  ) {
    const updateStatus: any = await this.userService.updateUser(
      email,
      updateUser,
    );

    if (updateStatus.updatedData) {
      return {
        ...STATUS_CODES.OK,
        data: updateStatus.updatedData || null,
        message: MESSAGES.USER.UPDATE_USER_BY_ID_SUCCESS,
      };
    } else {
      return {
        ...STATUS_CODES.BAD_REQUEST,
        message: MESSAGES.USER.UPDATE_USER_BY_ID_FAILURE,
      };
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @Version('1')
  @HttpCode(STATUS_CODES.OK.code)
  @ApiOperation({ summary: 'Delete a user by id' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({
    status: STATUS_CODES.OK.code,
    description: MESSAGES.USER.DELETE_USER_BY_ID_SUCCESS,
  })
  @ApiResponse({
    status: STATUS_CODES.BAD_REQUEST.code,
    description: MESSAGES.USER.DELETE_USER_BY_ID_FAILURE,
  })
  @ApiResponse({ status: 200, description: 'User deleted successfully.' })
  async deleteUser(@Param('email') email: string) {
    const deleteStatus: any = await this.userService.deleteUser(email);

    if (deleteStatus === 'SUCCESS') {
      return {
        ...STATUS_CODES.OK,
        message: MESSAGES.USER.DELETE_USER_BY_ID_SUCCESS,
      };
    } else {
      return {
        ...STATUS_CODES.BAD_REQUEST,
        message: MESSAGES.USER.DELETE_USER_BY_ID_FAILURE,
      };
    }
  }
}
