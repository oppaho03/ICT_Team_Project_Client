
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

/* 인터페이스 : 데이터 세트 - 메타 데이터
 */
export interface IDataMeta {
  id?: number,
  key: string, 
  value: string
}


///
/// 데이터 세트 : 회원  
/// 

/* 인터페이스: 데이터 세트 - 인증코드 -> 토큰 요청 바디 데이터
*/
export interface IDataOAuthToken {
  id_token?: string,
  token_type: string,
  access_token: string,
  expires_in?: number,
}

/* 인터페이스: 데이터 세트 - SNS 인증 토큰 및 프로필 
*/
export interface IDataOAuthTokenPayload {
  provider_id: string,
  provider: string,
  picture?: string,
  name?: string,
  family_name?: string,
  given_name?: string,
  email: string,
  token: IDataOAuthToken
}

/* 인터페이스 : 데이터 세트 - 회원
 */
export interface IDataMember {
  id: number,
  email: string
  name: string,
  nickname: string,
  gender: string, // M | F
  birth: string, 
  address: string, 
  updated_at: string,
  created_at: string,
  token?: string,
  meta?: any,
  contact?: string, 
  status?: number,
}

/* 인터페이스 : 데이터 세트 - 회원 (SNS 로그인) 
 */
export interface IDataMemberWithSNS {
  id: number,
  member: IDataMember,
  login_id: string,
  provider: string,
  provider_id: string,
  access_token: string,
  refresh_token: string,
  status: number,
  login_modified_at: string,
  login_created_at: string,
}



///
/// 데이터 세트 : 포스트 (글 & 미디어 등)  
/// 
export interface IDataPost {
  id: number, 
  author: IDataMember,
  post_title: string,
  post_content: string | null,
  post_summary: string | null,
  post_status : string, // PUBLISH
  post_pass: string | null, 
  post_name: string | null, 
  post_mime_type: string | null,
  post_created_at: string, 
  post_modified_at: string,
  comment_status: string, 
  comment_count: 0,
  categories?: IDataCategory[],
  meta?: IDataMeta[]
}


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
  member: IDataMember, 
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