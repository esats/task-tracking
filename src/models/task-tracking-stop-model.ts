import { ApiProperty } from "@nestjs/swagger";

export class TaskTrackingStopModel {
    @ApiProperty()
    taskId: number;
    @ApiProperty()
    userId: number;
}