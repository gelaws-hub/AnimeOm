import "./LinkSecondary.css";
import { Link } from "react-router-dom";

export default function LinkSecondary({url,text}){
    return  <Link className="linkSecondary" to={url}>{text}</Link>
}