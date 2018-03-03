import { VertexNormalsHelper, LineSegments, LineBasicMaterial, } from 'three'
import { WireframeGeometry, Geometry, Group, MeshStandardMaterial }  from 'three'


//import FaceNormalsHelper from 'three'

export default class Model3D {
    // model = 3D THREE.js Geometry Object
    constructor( model ) {

        this.selected = false;
        this.model = model;
        this.state = {
            toggledWireframe: false,
            toggledVertexNormals: false,
            toggledFaceNormals: false,
            toggledMesh: true,
            toggledTextures: true,
        }

        if ( this.model.children[0].name === "Plane") {
            this.model.children.splice(0, 1);
        }

        this.textures = []
        this.model.children.forEach(element => {
            this.textures.push(element.material);
        })
        this.extractedGeometry = this.extractGeometry( this.model )
        this.vertexNormals = new VertexNormalsHelper( this.model, 0.15 );

        //Work out the issue with facenormals
        //this.faceNormals = new FaceNormalsHelper( this.model, 0.15 );

        // this is so, when I'm importing them in the scene I don't need to write all this separately.
        this.import = [this.vertexNormals/*, this.faceNormals,*/, this.model ]

        //every model starts at the center, you can move it using the moveModel() method.
        this.model.position.x = 0;
        this.model.position.y = 0;
        this.model.position.z = 0;

        //this.faceNormals.visible = false;
        this.vertexNormals.visible = this.state.toggledVertexNormals;


    }

    extractGeometry(model){

        let mat = new LineBasicMaterial( { color: 0x2185d0, linewidth: 1.5 } );            
        let allLines = new Group()

        model.children.forEach(mesh => {
            var edge = new WireframeGeometry(new Geometry().fromBufferGeometry(mesh.geometry), 0xffffff);
            var line = new LineSegments( edge, mat );
            allLines.add(line)
        });

        return allLines
    }
    
    moveModel( x, y, z ) {

        this.model.position.x = x
        this.vertexNormals.position.x = x
        this.faceNormals.position.x = x
        this.wireframeLines.position.x = x

        this.model.position.y = y
        this.vertexNormals.position.y = y
        this.faceNormals.position.y = y
        this.wireframeLines.position.y = y

        this.model.position.z = z
        this.vertexNormals.position.z = z
        this.faceNormals.position.z = z
        this.wireframeLines.position.z = z

    }
    //there are global toggle methods and local, these are the local ones.
    toggleVertexNormals(){

        this.vertexNormals.visible = !this.vertexNormals.visible

    }

    toggleFaceNormals(){
        console.log("stub! fn")
        //this.faceNormals.visible = !this.faceNormals.visible

    }

    toggleWireframe(optional){
        console.log(optional)
        if (optional !== undefined) {
            this.state.toggledWireframe = optional
        } else {
            this.state.toggledWireframe = !this.state.toggledWireframe
        }

        this.model.children.forEach(element => {
            element.material.wireframe = this.state.toggledWireframe
        });
    }

    toggleTextures(){
        if (!this.state.toggledTextures) {
            for (let i = 0; i < this.textures.length; i++) {
                this.model.children[i].material = this.textures[i]
            }
            this.state.toggledTextures = true;
            this.toggleWireframe(this.state.toggledWireframe)        
        } else {
            this.model.children.forEach(element => {
                element.material = new MeshStandardMaterial(0xffffff)
            });
            this.state.toggledTextures = false;
            this.toggleWireframe(this.state.toggledWireframe)
        }
    }

    toggleMesh(){

        this.model.visible = !this.model.visible

    }

    setOpacity(value){

        this.model.material.opacity = value;

    }
}