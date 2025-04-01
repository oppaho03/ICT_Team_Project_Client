
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



///
/// 데이터 세트 : 채팅 
/// 

/* 인터페이스 : 데이터 세트 - 키워드 추출 결과 
*/
export interface IDataExtraKeywords {
  original_text: string, 
  processed_text: string, 
  keywords: string[] | null
}

/* 인터페이스 : 데이터 세트 - 채팅 세션
 */
export interface IDataChatSession {
  id: number,
  member: number, 
  lastQuestion?: string,
  count: number, 
  status: number, // 0 - open, 1 - closed
  created_at: string | null, 
  updated_at: string | null
}


/* 인터페이스 : 데이터 세트 - 채팅 . 답변
 */
export interface IDataChatAnswer {
  id: number | null,
  file_name: string | null, 
  intro: string | null,
  body: string | null,
  conclusion: string | null,
  categories: IDataCategory[] | null,
  keywords?: string[] | null
}

/* 인터페이스 : 데이터 세트 - 채팅 . 답변 (세션으로 묶음)
 */
export interface IDataChatAnswerBindSession {
  sid: number, 
  answers: IDataChatAnswer[] | null,
  question?: string | null,
}

/* 인터페이스 : 데이터 세트 - 채팅 . 질문
 */
export interface IDataChatQuestion {
  id: number,
  content: string, 
  created_at: string | null, 
}

/* 인터페이스 : 데이터 세트 - 채팅 . 답변 + 질문
 */
export interface IDataChatQnA {
  id: number,
  is_matched: number,
  session?: IDataChatSession, 
  question: IDataChatQuestion,
  answer: IDataChatAnswer

}

/* 인터페이스 : 데이터 세트 - 비디오
 */
export interface IDataYoutubeSearchResult {
  kind: string,
  etag: string,
  id: {
    kind: string,
    videoId: string
  },
  snippet: {
    publishedAt: string,
    channelId: string,
    title: string,
    description: string,
    thumbnails?: {
      default?: {
        url: string,
        width: number,
        height: number
      },
      medium?: {
        url: string,
        width: number,
        height: number
      },
      high?: {
        url: string,
        width: number,
        height: number
      }
    },
    channelTitle: string,
    liveBroadcastContent: string,
    publishTime: string
  }
}