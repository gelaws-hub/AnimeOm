import LinkPrimary from "../components/LinkPrimary";
import LinkSecondary from "../components/LinkSecondary";
import Layout from "../components/Layout";
import Gap from "../components/Gap";

import "./Home.css";

export default function Welcome(){
    return (
        <Layout>
            <div className="contentWelcome">
                <img src="https://i.ppy.sh/20478104a35f6943377f896a1edb5f3c0e138a36/68747470733a2f2f6d656469612e74656e6f722e636f6d2f4a654c756f56683169626741414141692f736869677572652d75692d75692d736869677572652e676966" className="contentWelcomeImg" alt="rocket"></img>
                <h2 className="contentWelcomeTitle">AnimeOm</h2>
                <br/>
                <p className="contentWelcomeBody"> The more anime you watch, the more you feel lonely </p>
                <Gap
                    height={25}
                />
               <LinkPrimary
                    url="/AnimeTop"
                    text="Anime Terpopuler"
                />
                <Gap
                    height={10}
                />
                <LinkSecondary
                    url="/AnimeRec"
                    text="Nonton Anime Bajakan"
                />
            </div>
        </Layout>
    ) 
}