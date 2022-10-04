import { ApiProperty } from "@nestjs/swagger";

export class TaskTrackingStartModel {
    @ApiProperty()
    taskId: number;
    @ApiProperty()
    userId: number;
    @ApiProperty()
    description: string;
}