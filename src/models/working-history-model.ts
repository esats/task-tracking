import { ApiProperty } from "@nestjs/swagger";

export class WorkingHistoryModel {
    @ApiProperty()
    userId: number;
    @ApiProperty()
    user: string;
    @ApiProperty()
    title: string;
    @ApiProperty()
    description: string;
    @ApiProperty()
    startDate: Date;
    @ApiProperty()
    endDate: Date;

    public constructor(init?:Partial<WorkingHistoryModel>) {
        Object.assign(this, init);
    }
}