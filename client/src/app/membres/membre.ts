export class Membre {

    private email:String;
    private MDP : String;
    private nom : String;
    private prenom: String;
    private role : String;
    private ville : String;
    private adresse : String;
    private telephone : String;

    //constructor() { }

    constructor( email:String, MDP : String,nom : String,prenom: String
            ,role : String, ville : String, adresse : String,telephone : String){
                this.email=email;
                this.MDP=MDP;
                this.nom=nom;
                this.prenom=prenom;
                this.role=role;
                this.ville=ville;
                this.adresse=adresse;
                this.telephone=telephone;
            }


    setEmail(email:String){
        this.email=email;
    }

    getEmail(){
        return this.email;
    }

    setMDP(MDP:String){
        this.MDP=MDP;
    }

    getMDP(){
        return this.MDP;
    }


    setNom(nom:String){
        this.nom=nom;
    }

    getNom(){
        return this.nom;
    }


    setPrenom(prenom:String){
        this.prenom=prenom;
    }

    getPrenom(){
        return this.prenom;
    }


    setRole(role:String){
        this.role=role;
    }

    getRole(){
        return this.role;
    }

    setVile(ville:String){
        this.ville=ville;
    }

    getVille(){
        return this.ville;
    }

    setAdresse(adresse:String){
        this.adresse=adresse;
    }

    getAdresse(){
        return this.adresse;
    }

    setTelephone(telephone:String){
        this.telephone=telephone;
    }

    getTelephone(){
        return this.telephone;
    }

}
