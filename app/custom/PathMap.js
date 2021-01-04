
export default function PathMap() {

    this.pathMap = {
        'Unrechtmaessige_Verarbeitung':{
            d:'m 58.586313,-1146.7798 -12.611077,-0.08 -6.236608,-10.9613 6.374469,-10.8817 12.611077,0.08 6.236608,10.9613 z'+
                'M 140.22917,76.729164 114.52679,121.24699 H 63.12203 L 37.419651,76.729164 63.12203,32.211337 h 51.40476 z' +
                'M 60.234375,27.210938 31.646484,76.728516 60.234375,126.24609 h 57.179685 l 28.58789,-49.517574 -1.44336,-2.5 -27.14453,-47.017578 z m 5.773437,10 h 45.632808 l 22.81446,39.517578 -22.81446,39.517574 H 66.007812 L 43.193359,76.728516 Z'
        },
        'Kein_Zweck':{

        },
        'Unrichtigkeit':{

        },
        'Integrität_Vertraulichkeit':{

        },
        'Haftung':{

        },
        'Automatisierte_Entscheidungen':{

        },
        'besondere_Kategorie_personenbezogener_Daten':{

        },
        'Informationspflichtverletzung':{

        },
        'Informationspflichtverletzung_betroffene_Person':{

        },
        'Informationspflichtverletzung_Verantwortlicher':{

        },
        'Informationspflichtverletzung_Aufsichtsbehörde':{

        },
        'Auskunftspflichtverletzung':{

        },
        'Auskunftspflichtverletzung_betroffene_Person':{

        },
        'Auskunftspflichtverletzung_Verantwortlicher':{

        },
        'Auskunftspflichtverletzung_Aufsichtsbehörde':{

        }
    };


    this.getRawPath = function getRawPath(pathId) {
        return this.pathMap[pathId].d;
    };

    this.getScaledPath = function getScaledPath(pathId, param) {
        var rawPath = this.pathMap[pathId];

        // positioning
        // compute the start point of the path
        var mx, my;

        if (param.abspos) {
            mx = param.abspos.x;
            my = param.abspos.y;
        } else {
            mx = param.containerWidth * param.position.mx;
            my = param.containerHeight * param.position.my;
        }

        var coordinates = {}; // map for the scaled coordinates
        if (param.position) {

            // path
            var heightRatio = (param.containerHeight / rawPath.height) * param.yScaleFactor;
            var widthRatio = (param.containerWidth / rawPath.width) * param.xScaleFactor;


            // Apply height ratio
            for (var heightIndex = 0; heightIndex < rawPath.heightElements.length; heightIndex++) {
                coordinates['y' + heightIndex] = rawPath.heightElements[heightIndex] * heightRatio;
            }

            // Apply width ratio
            for (var widthIndex = 0; widthIndex < rawPath.widthElements.length; widthIndex++) {
                coordinates['x' + widthIndex] = rawPath.widthElements[widthIndex] * widthRatio;
            }
        }

        // Apply value to raw path
        var path = format(
            rawPath.d, {
                mx: mx,
                my: my,
                e: coordinates
            }
        );
        return path;
    };
}