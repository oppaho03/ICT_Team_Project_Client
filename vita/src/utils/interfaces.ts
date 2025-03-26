/* 인터페이스 : 응답 데이터
 */
export interface IResponseEntity { success: number, response: any }


/* 인터페이스 : 데이터 세트 - 용어 및 카테고리
 */
export interface IDataCategory {
  id: number | null,
  name: string | null,
  slug: string | null,
  group_number: number | null,
  description: string | null,
  count: number | null,
  parent: number | null
};

/* 인터페이스 : 데이터 세트 - 채팅 . 답변
 */
export interface IDataChatAnswer {
  
}

// /* 인터페이스 : 데이터 세트 - 
//  */
// export interface IDataAnswer {
//   id: number | null,
//   file_name: string | null, 
//   intro: string | null,
//   body: string | null,
//   conclusion: string | null,
//   categories: IDataCategory[] | null
// }