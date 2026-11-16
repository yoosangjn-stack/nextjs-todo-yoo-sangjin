import {statuses,type Status} from './types';
export function validateTodo(title:string,content:string,status:string){
 if(!title.trim()||title.trim().length>100)return '제목은 1~100자로 입력하세요.';
 if(content.length>5000)return '내용은 5,000자 이내로 입력하세요.';
 if(!statuses.includes(status as Status))return '올바른 상태를 선택하세요.';
 return null;
}
export function validId(id:string){return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);}