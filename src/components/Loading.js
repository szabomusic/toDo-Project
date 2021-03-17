import Clouds from './images/clouds.png'
import Mountainpics from './images/mountainpics.png'
const Loading = () => {
    return (
        <div className='loadingParent'>
            <div className="loadingContainer">
                <img id='mountainImg'src={Mountainpics}></img>
                <img id='cloud1'src={Clouds}></img>
                <img id='cloud2'src={Clouds}></img>
                <img id='cloud3'src={Clouds}></img>
                <img id='cloud4'src={Clouds}></img>
            </div>
                <div className='loadingBorder'></div>
        </div>
    )
}

export default Loading