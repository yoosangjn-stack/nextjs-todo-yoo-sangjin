export const statuses=['READY','PROGRESS','DONE'] as const;
export type Status=typeof statuses[number];
export type Todo={id:string;user_id:string;user_name:string;title:string;content:string;status:Status;created_at:string;updated_at:string|null};
export type Result={error?:string;success?:string;redirectTo?:string};
export const labels:Record<Status,string>={READY:'할 일',PROGRESS:'진행 중',DONE:'완료'};