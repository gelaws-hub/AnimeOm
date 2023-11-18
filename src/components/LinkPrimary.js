import "./LinkPrimary.css";
import { Link } from "react-router-dom";

export default function LinkPrimary({url,text}){
    return  <Link className="linkPrimary" to={url}>{text}</Link>
}