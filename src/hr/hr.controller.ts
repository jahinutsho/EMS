import { Controller, UseGuards, Body, Get, Param, Patch, Post } from '@nestjs/common';
import { HrService } from './hr.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Role } from '../auth/role/role.decorator';
import { UserRole } from '../auth/role/role';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { LeaveApprovalDto } from './dto/leave-approval.dto';
import { CreateReviewDto } from './dto/create-review.dto';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Role(UserRole.HR_MANAGER)
@Controller('hr')
export class HrController {
  constructor(private readonly hrService: HrService) {}

  @Post('employees')
  onboardEmployee(@Body() dto: CreateEmployeeDto) {
    return this.hrService.onboardEmployee(dto);
  }

  @Get('employees')
  getAllEmployees() {
    return this.hrService.getAllEmployees();
  }

  @Patch('employees/:id')
  updateEmployee(@Param('id') id: number, @Body() dto: UpdateEmployeeDto) {
    return this.hrService.updateEmployee(id, dto);
  }

  @Get('leave-requests')
  getAllLeaveRequests() {
    return this.hrService.getAllLeaveRequests();
  }

  @Patch('leave-requests/:id')
  approveOrRejectLeave(@Param('id') id: number, @Body() dto: LeaveApprovalDto) {
    return this.hrService.approveOrRejectLeave(id, dto);
  }

  @Post('reviews')
  addPerformanceReview(@Body() dto: CreateReviewDto) {
    return this.hrService.addPerformanceReview(dto);
  }

  @Get('reviews/:employeeId')
  getEmployeeReviews(@Param('employeeId') employeeId: number) {
    return this.hrService.getEmployeeReviews(employeeId);
  }

  @Post('announcements')
  postAnnouncement(@Body() dto: CreateAnnouncementDto) {
    return this.hrService.postAnnouncement(dto);
  }

  @Get('announcements')
  getAllAnnouncements() {
    return this.hrService.getAllAnnouncements();
  }
} 