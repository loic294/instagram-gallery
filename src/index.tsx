import * as React from "react";
import * as ReactDOM from "react-dom";
export interface InstagramProps {  }


class InstagramApp extends React.Component<InstagramProps, any> {

    constructor() {
        super()

        this.state = {
            images : [],
            position : 0,
            cycle : 5,
            cyclePos : 0,
            translate : [
                "200",
                "100",
                "0", 
                "-100",
                "-200"
            ]
        }
    }

    componentDidMount() {

        this.getInstagramImages().then((data) => {
            this.setState({
                images: data.data
            }, function(){

                let updatePosition = ()=>{
                    let cylce = this.state.cyclePos + 1;
                    if(this.state.cyclePos == this.state.cycle) cylce = 0;
                    this.setState({ 
                        position : this.state.position + 1, 
                        cyclePos : cylce
                    });
                };
                var myTimer = setInterval(updatePosition, 3000);

            })
        })
    }

    async getInstagramImages () : Promise<any> {
        let url =  'API_ENDPOINT';
        let response = await fetch(url);
        return await response.json();  

    }

    render() {

        let cylce = 5;

        return (
            <div>
                {[0,1,2,3,4].map((pos : number, i: number) => {
                    let position = this.state.translate[(pos + this.state.cyclePos) % 5];
                    let style = 1;
                    if(position == "200" || position == "-200") style = 0;
                    return <div key={i} className="fullscreen-image" style={{ transform : `translateX(${position}%)`, opacity: style }}> 
                        <div className="img-container">
                            {this.state.images[0] !== undefined && <div>
                                <img src={this.state.images[i].images.standard_resolution.url} />
                                <p>@ {this.state.images[i].user.username}</p>
                            </div>}
                        </div>
                    </div>
                    
                    
                })}
            </div>
        );

    }

}

ReactDOM.render(
    <InstagramApp />,
    document.getElementById("example")
);