import { vec2 } from "gl-matrix";
import engine from "../../engine/index";
import Viewport from "../../engine/viewport";
import Camera from "../../engine/camera";
import RgbaColor from "../../engine/rgba_color";
import Renderable from "../../engine/renderable";

class SceneFileParser {
    constructor(private xml:Document) {
        
    }

    parseCamera(): Camera {
        const cameraElements = this.getElement(this.xml, "Camera");
        const cameraElement = cameraElements[0];

        const centerX = Number(cameraElement.getAttribute("CenterX"));
        const centerY = Number(cameraElement.getAttribute("CenterY"));
        const width = Number(cameraElement.getAttribute("Width"));
        const viewportArray = cameraElement.getAttribute("Viewport")?.split(" ").map(Number);
        const bgColorArray = cameraElement.getAttribute("BgColor")?.split(" ").map(Number);

        if (viewportArray && bgColorArray) {
            const camera = new engine.Camera(
                vec2.fromValues(centerX, centerY),
                width,
                new Viewport(viewportArray[0], viewportArray[1], viewportArray[2], viewportArray[3])
            );
            camera.backgroundColor = new RgbaColor(bgColorArray[0], bgColorArray[1], bgColorArray[2], bgColorArray[3]);

            return camera;
        }

        throw Error("Failed to parse camera");
    }

    parseSquares(sqSet: Renderable[]) {
        const squareElements = this.getElement(this.xml, "Square");
        console.log("parsing " + squareElements.length + " two square tags and their attributes");
        let squareElement: Element;
        let x: GLfloat = 0;
        let y: GLfloat = 0;
        let width: GLfloat = 0;
        let height: GLfloat = 0;
        let rotation: GLfloat = 0;
        let colorArray: number[]|undefined;
        for (let i = 0; i < squareElements.length; i++) {
            console.log("reading square tag " + i);
            squareElement = <Element>squareElements.item(i);
            console.log(squareElement);
            x = Number(squareElement.attributes.getNamedItem("PosX")?.value);
            y = Number(squareElement.attributes.getNamedItem("PosY")?.value);
            width = Number(squareElement.attributes.getNamedItem("Width")?.value);
            height = Number(squareElement.attributes.getNamedItem("Height")?.value);
            rotation = Number(squareElement.attributes.getNamedItem("Rotation")?.value);
            colorArray = squareElement.attributes.getNamedItem("Color")?.value.split(" ").map(Number);
            if (colorArray) {
                const square = new engine.Renderable();
                square.setColor(new RgbaColor(colorArray[0], colorArray[1], colorArray[2], colorArray[3]));
                const xform = square.getXform();
                xform.setPosition(x, y);
                xform.setRotationInDeg(rotation);
                xform.setSize(width, height);
                sqSet.push(square);
            }
        }
    }

    getElement(xmlContent: Document, tagName: string): HTMLCollectionOf<Element> {
        const element = xmlContent.getElementsByTagName(tagName);
        if (element.length === 0) {
            console.error("Warning: Level element:[" + tagName + "]: is not found!");
        }
        return element;
    }
}

export default SceneFileParser;