import React from 'react';
import '../CSS/primary.css';
import { Button, Image, Icon, Label, Header, Modal } from 'semantic-ui-react';

var fileDir = [
    { fileName: './50images/n01580077_133.JPEG', id: "n01580077" },
    { fileName: './50images/n01632458_59.JPEG', id: "n01632458" },
    { fileName: './50images/n01682714_317.JPEG', id: "n01682714" },
    { fileName: './50images/n01689811_214.JPEG', id: "n01689811" },
    { fileName: './50images/n01697457_512.JPEG', id: "n01697457" },
    { fileName: './50images/n01740131_161.JPEG', id: "n01740131" },
    { fileName: './50images/n01773797_67.JPEG', id: "n01773797" },
    { fileName: './50images/n01829413_121.JPEG', id: "n01829413" },
    { fileName: './50images/n01855032_80.JPEG', id: "n01855032" },
    { fileName: './50images/n01877812_69.JPEG', id: "n01877812" },
    { fileName: './50images/n02012849_26.JPEG', id: "n02012849" },
    { fileName: './50images/n02085936_566.JPEG', id: "n02085936" },
    { fileName: './50images/n02091831_7073.JPEG', id: "n02091831" },
    { fileName: './50images/n02094258_73.JPEG', id: "n02094258" },
    { fileName: './50images/n02097474_10485.JPEG', id: "n02097474" },
    { fileName: './50images/n02109047_9103.JPEG', id: "n02109047" },
    { fileName: './50images/n02123394_89.JPEG', id: "n02123394" },
    { fileName: './50images/n02165456_1036.JPEG', id: "n02165456" },
    { fileName: './50images/n02174001_34.JPEG', id: "n02174001" },
    { fileName: './50images/n02219486_4494.JPEG', id: "n02219486" },
    { fileName: './50images/n02259212_37.JPEG', id: "n02259212" },
    { fileName: './50images/n02281787_47.JPEG', id: "n02281787" },
    { fileName: './50images/n02356798_86.JPEG', id: "n02356798" },
    { fileName: './50images/n02364673_128.JPEG', id: "n02364673" },
    { fileName: './50images/n02447366_138.JPEG', id: "n02447366" },
    { fileName: './50images/n02708093_14.JPEG', id: "n02708093" },
    { fileName: './50images/n02814860_161.JPEG', id: "n02814860" },
    { fileName: './50images/n02871525_900.JPEG', id: "n02871525" },
    { fileName: './50images/n02894605_1089.JPEG', id: "n02894605" },
    { fileName: './50images/n02951585_147.JPEG', id: "n02951585" },
    { fileName: './50images/n03028079_102.JPEG', id: "n03028079" },
    { fileName: './50images/n03109150_446.JPEG', id: "n03109150" },
    { fileName: './50images/n03196217_35.JPEG', id: "n03196217" },
    { fileName: './50images/n03259280_9.JPEG', id: "n03259280" },
    { fileName: './50images/n03344393_384.JPEG', id: "n03344393" },
    { fileName: './50images/n03445924_293.JPEG', id: "n03445924" },
    { fileName: './50images/n03532672_506.JPEG', id: "n03532672" },
    { fileName: './50images/n03627232_730.JPEG', id: "n03627232" },
    { fileName: './50images/n03661043_875.JPEG', id: "n03661043" },
    { fileName: './50images/n03676483_360.JPEG', id: "n03676483" },
    { fileName: './50images/n03763968_319.JPEG', id: "n03763968" },
    { fileName: './50images/n03788195_532.JPEG', id: "n03788195" },
    { fileName: './50images/n03877845_540.JPEG', id: "n03877845" },
    { fileName: './50images/n03908714_5.JPEG', id: "n03908714" },
    { fileName: './50images/n03967562_1908.JPEG', id: "n03967562" },
    { fileName: './50images/n04116512_345.JPEG', id: "n04116512" },
    { fileName: './50images/n04252225_15.JPEG', id: "n04252225" },
    { fileName: './50images/n04355338_194.JPEG', id: "n04355338" },
    { fileName: './50images/n04456115_959.JPEG', id: "n04456115" },
    { fileName: './50images/n04517823_269.JPEG', id: "n04517823" },
]    

var activeIndex = Math.floor(Math.random() * 50), usedImages = [activeIndex], taskDone = 1, flag;
var timeTaken = { minutes: 0, seconds: 0, milsec: 0 }, addTime = [0, 0, 0], avgTime = [], Interval;
var fileName = fileDir[activeIndex].fileName;

export class MainImages extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isopen: false,
            activeNext: false
        };
    }

    componentDidMount() {
        alert("* Please disable AdBlock and any other antivirus software before you begin!\n Make sure to \"Allow\" popups/cookies on this app! *");
        this.props.onRef(this)
    }

    updateButton() {
        this.state.activeNext ? this.setState({ activeNext: false }) : this.setState({ activeNext: true })
    }

    OnFinish() {
        //To find the Average time
        let td = taskDone - 1;
        avgTime[0] = addTime[0] / td;
        avgTime[1] = addTime[1] / td;
        avgTime[2] = addTime[2] / td;

        avgTime[1] += (avgTime[0] * 60) % 60;
        avgTime[2] += (avgTime[1] * 100) % 100;

        avgTime[0] = Math.floor(avgTime[0]);
        avgTime[1] = Math.floor(avgTime[1]);
        avgTime[2] = Math.floor(avgTime[2]);

        this.props.onFinish(addTime, avgTime);
    }

    startTimer() {
        timeTaken.milsec++;

        if (timeTaken.milsec > 99) {
            timeTaken.seconds++;
            timeTaken.milsec = 0;
        }

        if (timeTaken.seconds > 59) {
            timeTaken.minutes++;
            timeTaken.seconds = 0;
        }
    }

    startWatch() {
        Interval = setInterval(this.startTimer, 10);
    }

    changeImage() {
        //Pause the StopWatch
        clearInterval(Interval);
        this.updateButton();

        //To pass values to Parent (App.js);
        let t = timeTaken.minutes + ":" + timeTaken.seconds + ":" + timeTaken.milsec;
        this.props.onNextImage(fileDir[activeIndex].fileName, fileDir[activeIndex].id, t);

        //Add the time to find total time take
        addTime[2] += timeTaken.milsec;
        if (addTime[2] > 99) {
            addTime[1] += Math.floor(addTime[2] / 100);
            addTime[2] %= 100;
        }
        addTime[1] += timeTaken.seconds;
        if (addTime[1] > 59) {
            addTime[0] += Math.floor(addTime[1] / 60);
            addTime[1] %= 60;
        }
        addTime[0] += timeTaken.minutes;
        
        //Clear the StopWatch
        timeTaken.milsec = timeTaken.seconds = timeTaken.minutes = 0;

        //Load next image
        taskDone++;
        //Change here to lock the images
        if (taskDone > 50) {
            this.setState({
                isopen: true
            })
        }
        else
            do {
                flag = true;
                activeIndex = Math.floor(Math.random() * 50);

                for (var i = 0; i < usedImages.length; i++)
                    if (usedImages[i] === activeIndex)
                        flag = false;

                if (flag === true) {
                    usedImages.push(activeIndex);
                    fileName= fileDir[activeIndex].fileName;
                }
            } while (flag !== true);

        //Start the Watch
        this.startWatch();
    }

    render() {
        return (
            <div>
                <Image className="imageStyling" src={fileName} />

                <Label style={{ zIndex: "1", position: "fixed", top: "10px", right: '4vw' }} color="teal">
                    {taskDone}/50
                </Label>

                <div className="NextButton" style={{ width: '180px' }} >
                    {this.state.activeNext ?
                        <Button primary animated size='huge' onClick={this.changeImage.bind(this)}>
                            <Button.Content visible> Next Image </Button.Content>
                            <Button.Content hidden>
                                <Icon name='right arrow' />
                            </Button.Content>
                        </Button>
                        :
                        <Button disabled size='huge'>Next Image</Button>
                    }
                </div>

                <Modal open={this.state.isopen} basic dimmer="blurring" style={{ position: "fixed", width: "auto", marginTop: "30vh", marginLeft: "38vw" }}>
                    <Header icon='check square outline' style={{ textAlign: "center" }} content='Task Completed!' />
                    <Modal.Content>
                        <h2> Thank you for your participation! <br />
                            Please click on Finish. </h2>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='blue' inverted onClick={this.OnFinish.bind(this)}>
                            Finish
                        </Button>
                    </Modal.Actions>
                </Modal>
            </div>
        );
    }
}