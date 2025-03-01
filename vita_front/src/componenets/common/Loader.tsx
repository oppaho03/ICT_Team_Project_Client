/**
 * 컴포넌트 : 대기, 로더 
 */
import shortid from 'shortid';

interface ILinearGradientStop {
  offset : string,
  stopColor : string
};

interface ILoaderLinearGradient {
  id : string,
  stops : ILinearGradientStop[],
}; 

export default function Loader ( { classes = "fluid" } ) {

  // linearGrad Ring
  const gradientRing : ILoaderLinearGradient = {
    id : shortid.generate(),
    stops: [
      { offset : "0%", stopColor : "hsl(313,90%,55%)" },
      { offset : "100%", stopColor : "hsl(223,90%,55%)" }
    ]
  }
  // linearGrad : Ball
  const gradientBall : ILoaderLinearGradient = {
    id : shortid.generate(),
    stops: [
      { offset : "0%", stopColor : "hsl(313,90%,55%)" },
      { offset : "100%", stopColor : "hsl(223,90%,55%)" }
    ]
  }

  return (<>
    <div className={ "loaderbox" + (classes ? " " + classes : "" ) } aria-label="loader">
      <div className='loaderbox-in'>

        <svg className="loader type-1" viewBox="0 0 200 200" width="200" height="200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id={gradientRing.id} x1="1" y1="0.5" x2="0" y2="0.5">
            { gradientRing.stops.map( (stops, i) => <stop key={i} offset={stops.offset} stopColor={stops.stopColor} /> )  }
          </linearGradient>
          <linearGradient id={gradientBall.id} x1="0" y1="0" x2="0" y2="1">
            { gradientBall.stops.map( (stops, i) => <stop key={i} offset={stops.offset} stopColor={stops.stopColor} /> )  }
          </linearGradient>
        </defs>
        <circle className="loader__ring" cx="100" cy="100" r="82" fill="none" stroke={`url(#${gradientRing.id})`} strokeWidth="36" strokeDasharray="0 257 1 257" strokeDashoffset="0.01" strokeLinecap="round" transform="rotate(-90,100,100)" />
        <line className="loader__ball" stroke={`url(#${gradientBall.id})`} x1="100" y1="18" x2="100.01" y2="182" strokeWidth="36" strokeDasharray="1 165" strokeLinecap="round" />
        </svg>

      </div> {/* .loaderbox-in */}
    </div> {/* .loaderbox */}
  </>);
}