class RgbaColor extends Float32Array {
    constructor(red: GLfloat, green: GLfloat, blue: GLfloat, alpha?: GLfloat) {
        super(4);
        this[0] = red;
        this[1] = green;
        this[2] = blue;
        this[3] = alpha ?? 1;
    }

    get red():GLfloat{
        return <GLfloat>this[0];
    }
    set red(red: GLfloat) {
        this[0] = red;
    }

    get green():GLfloat{
        return <GLfloat>this[1];
    }
    set green(green: GLfloat) {
        this[1] = green;
    }

    get blue():GLfloat{
        return <GLfloat>this[2];
    }
    set blue(blue: GLfloat) {
        this[2] = blue;
    }

    get alpha():GLfloat{
        return <GLfloat>this[3];
    }
    set alpha(alpha: GLfloat) {
        this[3] = alpha;
    }

    static IndianRed = () => { return new RgbaColor(0.804, 0.361, 0.361, 1); }
    static LightCoral = () => { return new RgbaColor(0.941, 0.502, 0.502, 1); }
    static Salmon = () => { return new RgbaColor(0.980, 0.502, 0.447, 1); }
    static DarkSalmon = () => { return new RgbaColor(0.914, 0.588, 0.478, 1); }
    static LightSalmon = () => { return new RgbaColor(1.000, 0.627, 0.478, 1); }
    static Crimson = () => { return new RgbaColor(0.863, 0.078, 0.235, 1); }
    static Red = () => { return new RgbaColor(1.000, 0.000, 0.000, 1); }
    static FireBrick = () => { return new RgbaColor(0.698, 0.133, 0.133, 1); }
    static DarkRed = () => { return new RgbaColor(0.545, 0.000, 0.000, 1); }
    static Pink = () => { return new RgbaColor(1.000, 0.753, 0.796, 1); }
    static LightPink = () => { return new RgbaColor(1.000, 0.714, 0.757, 1); }
    static HotPink = () => { return new RgbaColor(1.000, 0.412, 0.706, 1); }
    static DeepPink = () => { return new RgbaColor(1.000, 0.078, 0.576, 1); }
    static MediumVioletRed = () => { return new RgbaColor(0.780, 0.082, 0.522, 1); }
    static PaleVioletRed = () => { return new RgbaColor(0.859, 0.439, 0.576, 1); }
    static Coral = () => { return new RgbaColor(1.000, 0.498, 0.314, 1); }
    static Tomato = () => { return new RgbaColor(1.000, 0.388, 0.278, 1); }
    static OrangeRed = () => { return new RgbaColor(1.000, 0.271, 0.000, 1); }
    static DarkOrange = () => { return new RgbaColor(1.000, 0.549, 0.000, 1); }
    static Orange = () => { return new RgbaColor(1.000, 0.647, 0.000, 1); }
    static Gold = () => { return new RgbaColor(1.000, 0.843, 0.000, 1); }
    static Yellow = () => { return new RgbaColor(1.000, 1.000, 0.000, 1); }
    static LightYellow = () => { return new RgbaColor(1.000, 1.000, 0.878, 1); }
    static LemonChion = () => { return new RgbaColor(1.000, 0.980, 0.804, 1); }
    static LightGoldenrodYellow = () => { return new RgbaColor(0.980, 0.980, 0.824, 1); }
    static PapayaWhip = () => { return new RgbaColor(1.000, 0.937, 0.835, 1); }
    static Moccasin = () => { return new RgbaColor(1.000, 0.894, 0.710, 1); }
    static PeachPu = () => { return new RgbaColor(1.000, 0.855, 0.725, 1); }
    static PaleGoldenrod = () => { return new RgbaColor(0.933, 0.910, 0.667, 1); }
    static Khaki = () => { return new RgbaColor(0.941, 0.902, 0.549, 1); }
    static DarkKhaki = () => { return new RgbaColor(0.741, 0.718, 0.420, 1); }
    static Lavender = () => { return new RgbaColor(0.902, 0.902, 0.980, 1); }
    static Thistle = () => { return new RgbaColor(0.847, 0.749, 0.847, 1); }
    static Plum = () => { return new RgbaColor(0.867, 0.627, 0.867, 1); }
    static Violet = () => { return new RgbaColor(0.933, 0.510, 0.933, 1); }
    static Orchid = () => { return new RgbaColor(0.855, 0.439, 0.839, 1); }
    static Fuchsia = () => { return new RgbaColor(1.000, 0.000, 1.000, 1); }
    static Magenta = () => { return new RgbaColor(1.000, 0.000, 1.000, 1); }
    static MediumOrchid = () => { return new RgbaColor(0.729, 0.333, 0.827, 1); }
    static MediumPurple = () => { return new RgbaColor(0.576, 0.439, 0.859, 1); }
    static BlueViolet = () => { return new RgbaColor(0.541, 0.169, 0.886, 1); }
    static DarkViolet = () => { return new RgbaColor(0.580, 0.000, 0.827, 1); }
    static DarkOrchid = () => { return new RgbaColor(0.600, 0.196, 0.800, 1); }
    static DarkMagenta = () => { return new RgbaColor(0.545, 0.000, 0.545, 1); }
    static Purple = () => { return new RgbaColor(0.502, 0.000, 0.502, 1); }
    static Indigo = () => { return new RgbaColor(0.294, 0.000, 0.510, 1); }
    static SlateBlue = () => { return new RgbaColor(0.416, 0.353, 0.804, 1); }
    static DarkSlateBlue = () => { return new RgbaColor(0.282, 0.239, 0.545, 1); }
    static GreenYellow = () => { return new RgbaColor(0.678, 1.000, 0.184, 1); }
    static Chartreuse = () => { return new RgbaColor(0.498, 1.000, 0.000, 1); }
    static LawnGreen = () => { return new RgbaColor(0.486, 0.988, 0.000, 1); }
    static Lime = () => { return new RgbaColor(0.000, 1.000, 0.000, 1); }
    static LimeGreen = () => { return new RgbaColor(0.196, 0.804, 0.196, 1); }
    static PaleGreen = () => { return new RgbaColor(0.596, 0.984, 0.596, 1); }
    static LightGreen = () => { return new RgbaColor(0.565, 0.933, 0.565, 1); }
    static MediumSpringGreen = () => { return new RgbaColor(0.000, 0.980, 0.604, 1); }
    static SpringGreen = () => { return new RgbaColor(0.000, 1.000, 0.498, 1); }
    static MediumSeaGreen = () => { return new RgbaColor(0.235, 0.702, 0.443, 1); }
    static SeaGreen = () => { return new RgbaColor(0.180, 0.545, 0.341, 1); }
    static ForestGreen = () => { return new RgbaColor(0.133, 0.545, 0.133, 1); }
    static Green = () => { return new RgbaColor(0.000, 0.502, 0.000, 1); }
    static DarkGreen = () => { return new RgbaColor(0.000, 0.392, 0.000, 1); }
    static YellowGreen = () => { return new RgbaColor(0.604, 0.804, 0.196, 1); }
    static OliveDrab = () => { return new RgbaColor(0.420, 0.557, 0.137, 1); }
    static Olive = () => { return new RgbaColor(0.502, 0.502, 0.000, 1); }
    static DarkOliveGreen = () => { return new RgbaColor(0.333, 0.420, 0.184, 1); }
    static MediumAquamarine = () => { return new RgbaColor(0.400, 0.804, 0.667, 1); }
    static DarkSeaGreen = () => { return new RgbaColor(0.561, 0.737, 0.561, 1); }
    static LightSeaGreen = () => { return new RgbaColor(0.125, 0.698, 0.667, 1); }
    static DarkCyan = () => { return new RgbaColor(0.000, 0.545, 0.545, 1); }
    static Teal = () => { return new RgbaColor(0.000, 0.502, 0.502, 1); }
    static Aqua = () => { return new RgbaColor(0.000, 1.000, 1.000, 1); }
    static Cyan = () => { return new RgbaColor(0.000, 1.000, 1.000, 1); }
    static LightCyan = () => { return new RgbaColor(0.878, 1.000, 1.000, 1); }
    static PaleTurquoise = () => { return new RgbaColor(0.686, 0.933, 0.933, 1); }
    static Aquamarine = () => { return new RgbaColor(0.498, 1.000, 0.831, 1); }
    static Turquoise = () => { return new RgbaColor(0.251, 0.878, 0.816, 1); }
    static MediumTurquoise = () => { return new RgbaColor(0.282, 0.820, 0.800, 1); }
    static DarkTurquoise = () => { return new RgbaColor(0.000, 0.808, 0.820, 1); }
    static CadetBlue = () => { return new RgbaColor(0.373, 0.620, 0.627, 1); }
    static SteelBlue = () => { return new RgbaColor(0.275, 0.510, 0.706, 1); }
    static LightSteelBlue = () => { return new RgbaColor(0.690, 0.769, 0.871, 1); }
    static PowderBlue = () => { return new RgbaColor(0.690, 0.878, 0.902, 1); }
    static LightBlue = () => { return new RgbaColor(0.678, 0.847, 0.902, 1); }
    static SkyBlue = () => { return new RgbaColor(0.529, 0.808, 0.922, 1); }
    static LightSkyBlue = () => { return new RgbaColor(0.529, 0.808, 0.980, 1); }
    static DeepSkyBlue = () => { return new RgbaColor(0.000, 0.749, 1.000, 1); }
    static DodgerBlue = () => { return new RgbaColor(0.118, 0.565, 1.000, 1); }
    static CornlowerBlue = () => { return new RgbaColor(0.392, 0.584, 0.929, 1); }
    static MediumSlateBlue = () => { return new RgbaColor(0.482, 0.408, 0.933, 1); }
    static RoyalBlue = () => { return new RgbaColor(0.255, 0.412, 0.882, 1); }
    static Blue = () => { return new RgbaColor(0.000, 0.000, 1.000, 1); }
    static MediumBlue = () => { return new RgbaColor(0.000, 0.000, 0.804, 1); }
    static DarkBlue = () => { return new RgbaColor(0.000, 0.000, 0.545, 1); }
    static Navy = () => { return new RgbaColor(0.000, 0.000, 0.502, 1); }
    static MidnightBlue = () => { return new RgbaColor(0.098, 0.098, 0.439, 1); }
    static Cornsilk = () => { return new RgbaColor(1.000, 0.973, 0.863, 1); }
    static BlanchedAlmond = () => { return new RgbaColor(1.000, 0.922, 0.804, 1); }
    static Bisque = () => { return new RgbaColor(1.000, 0.894, 0.769, 1); }
    static NavajoWhite = () => { return new RgbaColor(1.000, 0.871, 0.678, 1); }
    static Wheat = () => { return new RgbaColor(0.961, 0.871, 0.702, 1); }
    static BurlyWood = () => { return new RgbaColor(0.871, 0.722, 0.529, 1); }
    static Tan = () => { return new RgbaColor(0.824, 0.706, 0.549, 1); }
    static RosyBrown = () => { return new RgbaColor(0.737, 0.561, 0.561, 1); }
    static SandyBrown = () => { return new RgbaColor(0.957, 0.643, 0.376, 1); }
    static Goldenrod = () => { return new RgbaColor(0.855, 0.647, 0.125, 1); }
    static DarkGoldenrod = () => { return new RgbaColor(0.722, 0.525, 0.043, 1); }
    static Peru = () => { return new RgbaColor(0.804, 0.522, 0.247, 1); }
    static Chocolate = () => { return new RgbaColor(0.824, 0.412, 0.118, 1); }
    static SaddleBrown = () => { return new RgbaColor(0.545, 0.271, 0.075, 1); }
    static Sienna = () => { return new RgbaColor(0.627, 0.322, 0.176, 1); }
    static Brown = () => { return new RgbaColor(0.647, 0.165, 0.165, 1); }
    static Maroon = () => { return new RgbaColor(0.502, 0.000, 0.000, 1); }
    static White = () => { return new RgbaColor(1.000, 1.000, 1.000, 1); }
    static Snow = () => { return new RgbaColor(1.000, 0.980, 0.980, 1); }
    static Honeydew = () => { return new RgbaColor(0.941, 1.000, 0.941, 1); }
    static MintCream = () => { return new RgbaColor(0.961, 1.000, 0.980, 1); }
    static Azure = () => { return new RgbaColor(0.941, 1.000, 1.000, 1); }
    static AliceBlue = () => { return new RgbaColor(0.941, 0.973, 1.000, 1); }
    static GhostWhite = () => { return new RgbaColor(0.973, 0.973, 1.000, 1); }
    static WhiteSmoke = () => { return new RgbaColor(0.961, 0.961, 0.961, 1); }
    static Seashell = () => { return new RgbaColor(1.000, 0.961, 0.933, 1); }
    static Beige = () => { return new RgbaColor(0.961, 0.961, 0.863, 1); }
    static OldLace = () => { return new RgbaColor(0.992, 0.961, 0.902, 1); }
    static FloralWhite = () => { return new RgbaColor(1.000, 0.980, 0.941, 1); }
    static Ivory = () => { return new RgbaColor(1.000, 1.000, 0.941, 1); }
    static AntiqueWhite = () => { return new RgbaColor(0.980, 0.922, 0.843, 1); }
    static Linen = () => { return new RgbaColor(0.980, 0.941, 0.902, 1); }
    static LavenderBlush = () => { return new RgbaColor(1.000, 0.941, 0.961, 1); }
    static MistyRose = () => { return new RgbaColor(1.000, 0.894, 0.882, 1); }
    static Gainsboro = () => { return new RgbaColor(0.863, 0.863, 0.863, 1); }
    static LightGray = () => { return new RgbaColor(0.827, 0.827, 0.827, 1); }
    static Silver = () => { return new RgbaColor(0.753, 0.753, 0.753, 1); }
    static DarkGray = () => { return new RgbaColor(0.663, 0.663, 0.663, 1); }
    static Gray = () => { return new RgbaColor(0.502, 0.502, 0.502, 1); }
    static DimGray = () => { return new RgbaColor(0.412, 0.412, 0.412, 1); }
    static LightSlateGray = () => { return new RgbaColor(0.467, 0.533, 0.600, 1); }
    static SlateGray = () => { return new RgbaColor(0.439, 0.502, 0.565, 1); }
    static DarkSlateGray = () => { return new RgbaColor(0.184, 0.310, 0.310, 1); }
    static Black = () => { return new RgbaColor(0.000, 0.000, 0.000, 1); }    
}

export default RgbaColor;