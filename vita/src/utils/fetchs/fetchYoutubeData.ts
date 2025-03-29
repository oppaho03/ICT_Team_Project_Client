/**
 * 데이터 통신 (Fetch:Axios) : 유튜브 데이터 API
 */
import axios from "axios";
import * as IF from "../interfaces";
// import { SERVER_URL, SERVER_FEST_API_URL, IFetchResponseDefault }from  "./all";

const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_YT_API_KEY;


// 인터페이스: ISearchParams
interface ISearchParams {
  q: string, 
  key?: string,
  type?: string, // video | channel | playlist
  part?: string, // snippet
  maxResults?: number, 
} 

// 인터페이스: ISearchResponse 
interface ISearchResponse {
  kind: string,
  etag: string,
  regionCode: string,
  pageInfo: {
    totalResults: number,
    resultsPerPage: number
  },
  items: Array<IF.IDataYoutubeSearchResult>
}


const SearchResponseDefaultValue = {
  "kind": "youtube#searchListResponse",
  "etag": "iAu9k7KnpP8ZfpO_7g1TUIxFvQ4",
  "nextPageToken": "CAYQAA",
  "regionCode": "KR",
  "pageInfo": {
    "totalResults": 1000000,
    "resultsPerPage": 6
  },
  "items": [{
      "kind": "youtube#searchResult",
      "etag": "YGmeVIChNkMMWoZ-6CfnLPTMk5A",
      "id": {
        "kind": "youtube#video",
        "videoId": "T8FZlRM4l9M"
      },
      "snippet": {
        "publishedAt": "2023-07-14T09:00:18Z",
        "channelId": "UC9p63MYZE5nUKmr2RS0fNwA",
        "title": "평균수명 10년 늘리는 건강한 아침습관",
        "description": "아침습관 #아침 #아침에 안녕하세요 내과 전문의 닥터 케이 김지은입니다. 아침이 달라지면 우리의 하루, 그리고 수명에도 영향을 ...",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/T8FZlRM4l9M/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/T8FZlRM4l9M/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/T8FZlRM4l9M/hqdefault.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "내과전문의 닥터케이 Dr.K",
        "liveBroadcastContent": "none",
        "publishTime": "2023-07-14T09:00:18Z"
      }
    },
    {
      "kind": "youtube#searchResult",
      "etag": "uE-h-MlG-TkiIMXotbeF24gwq5o",
      "id": {
        "kind": "youtube#video",
        "videoId": "8Z8n1CfaJdI"
      },
      "snippet": {
        "publishedAt": "2020-05-04T09:00:04Z",
        "channelId": "UCiV4_cGVt-t-j6jMQ7RCrXw",
        "title": "대한민국 명의들의 건강습관 - 730회(20.04.29) 바꿔야 산다 습관 혁명",
        "description": "대한민국 명의들의 건강습관 #습관 #생활습관 #생활습관의학 #건강습관 #실천 #비만 #암 #질병 #만성질환 #대사증후군 #예방 ...",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/8Z8n1CfaJdI/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/8Z8n1CfaJdI/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/8Z8n1CfaJdI/hqdefault.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "KBS 생로병사의 비밀",
        "liveBroadcastContent": "none",
        "publishTime": "2020-05-04T09:00:04Z"
      }
    },
    {
      "kind": "youtube#searchResult",
      "etag": "M1PjxV0tZzLKZcY4859rRQIPd0M",
      "id": {
        "kind": "youtube#video",
        "videoId": "AcWe4sh5KCE"
      },
      "snippet": {
        "publishedAt": "2024-04-18T09:00:12Z",
        "channelId": "UCuU0wmMrojZEv_-nxgePuEw",
        "title": "&quot;영양제, 걷기 절대 아닙니다.&quot; 또래보다 10년 젊게 사는 최고의 습관 (노년내과 정희원 교수) | IOPE L.A.B.",
        "description": "본 영상은 노화 관리와 관련한 IOPE의 연구와 자문의의 전문 지식 공유 목적이며, 상품 광고와 무관합니다. 건강한 피부뿐 아니라 삶 ...",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/AcWe4sh5KCE/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/AcWe4sh5KCE/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/AcWe4sh5KCE/hqdefault.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "아이오페 IOPE",
        "liveBroadcastContent": "none",
        "publishTime": "2024-04-18T09:00:12Z"
      }
    },
    {
      "kind": "youtube#searchResult",
      "etag": "c55aalZdfA6NZg2qknC6tkbE6UU",
      "id": {
        "kind": "youtube#video",
        "videoId": "tERyN3T4mSw"
      },
      "snippet": {
        "publishedAt": "2022-08-02T01:42:37Z",
        "channelId": "UCzp_EKglYlon4-hOCF6tdfw",
        "title": "[건강강좌​] 콩팥 지키는 건강한 습관(콩팥병 예방과 관리방법) (22.7.15) 신장내과 김세중 교수",
        "description": "콩팥 #단백뇨 #저염식 #저칼륨식 #저단백식#저인산식 [#라이브건강강좌​] 2022년 7월 15일 라이브로 진행됐던 신장내과 김세중 ...",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/tERyN3T4mSw/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/tERyN3T4mSw/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/tERyN3T4mSw/hqdefault.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "분당서울대학교병원",
        "liveBroadcastContent": "none",
        "publishTime": "2022-08-02T01:42:37Z"
      }
    },
    {
      "kind": "youtube#searchResult",
      "etag": "iy5vcTvyRVESrCTFXVe1XG3R4ac",
      "id": {
        "kind": "youtube#video",
        "videoId": "qWM2D6AP2vg"
      },
      "snippet": {
        "publishedAt": "2022-11-12T02:00:31Z",
        "channelId": "UCTHZLYJyvhkg1hZ2vDzixuQ",
        "title": "건강한 노년 :두꺼운_확인_표시: 습관에 달려있다 / 가천대 길병원 신경외과 김영보  교수",
        "description": "신경외과 전문의, 뇌과학 전문가가 알려주는 건강의 비결! 노년기 건강을 영위하기 위해 꼭 알아야 할 습관과 비결에 대한 이야기를 ...",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/qWM2D6AP2vg/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/qWM2D6AP2vg/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/qWM2D6AP2vg/hqdefault.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "길병원TV",
        "liveBroadcastContent": "none",
        "publishTime": "2022-11-12T02:00:31Z"
      }
    },
    {
      "kind": "youtube#searchResult",
      "etag": "h8rw9-7GzMxtRnYVPwxd5cinpDM",
      "id": {
        "kind": "youtube#video",
        "videoId": "n1l3GwZmCBM"
      },
      "snippet": {
        "publishedAt": "2024-08-14T09:00:44Z",
        "channelId": "UCdtRAcd3L_UpV4tMXCw63NQ",
        "title": "사람들이 잘 모르는 최악의 습관 3가지",
        "description": "최악의 습관 □ 공식 카페 : https://cafe.naver.com/physicalgallery □ 비즈니스 문의 : physicalgallery500@gmail.com □ 인스타그램 ...",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/n1l3GwZmCBM/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/n1l3GwZmCBM/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/n1l3GwZmCBM/hqdefault.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "피지컬갤러리",
        "liveBroadcastContent": "none",
        "publishTime": "2024-08-14T09:00:44Z"
      }
    }
  ]
} as ISearchResponse;


/**
 * Youtube Data V3 : 비디오 검색
 * @param {IYoutubeDataSearchParams} params 
 * @param {*} callback 
 */
export async function findItems ( params: ISearchParams, callback: null | ( (datas:any|null )=> any ) ) {
  let respData;

  try {

    const paramsDefaultValues = {
      key: GOOGLE_API_KEY,
      maxResults: 6,
      type: "video",
      part: "snippet",
    } as ISearchParams;

    /**/
    const uri = `https://www.googleapis.com/youtube/v3/search`;
    params = { ...paramsDefaultValues, ...params };
    const result = await axios.get<ISearchResponse>( uri, { params }); 
    
    // 서버 응답 데이터 : ISearchResponse
    const resultData = result.data ? result.data as unknown as ISearchResponse : null;

    // 서버 응답 데이터 - 오류 처리
    if ( ! result || ! resultData ) {
      throw new Error( result.statusText );
    }

    // 서버 응답 데이터 
    respData = resultData.items ? resultData.items : [];
  }
  catch ( err: any ) {
    respData = SearchResponseDefaultValue.items;
    if ( err.message ) console.log(err.message);
    else console.log(err);
  }
  finally {
    if ( callback ) callback( respData );  
  }
  
}
