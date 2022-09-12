// Import modules
import  "./form";
import "./submit";
import { initDb } from "./database";

// Import CSS files
import "../css/index.css";

import 'bootstrap/dist/css/bootstrap.min.css';
import { Tooltip, Toast, Popover } from 'bootstrap';

import Logo from '../images/logo.png';
import Bear from '../images/bear.png';
import Dog from '../images/dog.png';

window.addEventListener('load', function () {
    initDb();
    document.getElementById('logo').src = Logo;
    document.getElementById('bearThumbnail').src = Bear;
    document.getElementById('dogThumbnail').src = Dog;
  });