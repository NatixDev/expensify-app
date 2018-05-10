Pour installer un serveur en local :

	yarn global add live-server

Pour lancer le serveur et notre index.html :

	live-server public


Pour installer Babel

	yarn global add babel-cli 
	ou 
	npm install -g babel-cli@6.24.1


Pour initialiser notre application avec yarn (dans le style de "npm init" pour g�n�rer notre "package.json") :

	yarn init


Permet d'installer les d�pendances n�cessaires au bon fonctionnement de Babel avec React

	yarn add babel-preset-react babel-preset-env


Cette commande va faire le lien entre notre fichier src/app.js dans lequel on d�veloppe l'application avec scripts/app.js, en r�sum� Babel va compiler notre code React dans le fichier scripts/app.js (fichier de sortie / --out-file) pour le rendre compr�hensible du navigateur :

	babel src/app.js --out-file=public/scripts/app.js --presets=env,react

Enfin pour que cela se mette � jour automatiquement on relance la m�me commande suivi de "--watch" (il faut ouvrir par la suite une nouvelle invite de commande, babel se servira de celle-ci comme lorsque le serveur est lanc�) :

	babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch


Permet de reinstaller nos d�pendances (pr�sentes dans "package.json") :

	yarn install


Permet de directement effectuer la modification dans l'array : 

	.map()


Permet de stopper le rechargement de la page :

	e.preventDefault();

Les "  ``  " permettent d'ins�rer au sein du "string" du javascript : `ceci est un ${this.test}`

Permet d'acc�der aux informations contenues dans la "class" parent : 

	super(valeur);



.bind() va nous permettre d'acc�der � la fonction et sa valeur :

	const obj = {
		name: "Vikram",
		getName() {
			return this.name;
		}
	}

	const getName = obj.getName.bind(obj);

	console.log(getName());


Permet de modifier l'�tat de la valeur pr�c�dente (setState), par exemple ici avec un compteur de base � 0 (prevState) :

	this.setState((prevState) => {
		return {
			count: prevState.count + 1
		};
	});


Les scripts � l'int�rieur de "package.json" permettent d'�viter d'installer globalement nos packages ou d'effectuer certaines t�ches longues ou r�p�titives :

	"scripts": {
	    "serve": "live-server public/",
	    "build": "webpack",
	    "build-babel": "babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch"
	},

Et pour executer ces scripts on utilise : 

	yarn run *nom du script, exemple : serve*


// WEBPACK //


Pour installer Webpack :

	yarn add webpack@3.1.0

Pour parametrer Webpack il faut un "input"/"entry" (dossier d'o� vient le code) et un "output" (dossier ou ressortira le code une fois transform�) :

	const path = require("path");


	module.exports = {
		entry: "./src/app.js",
		output: {
			path: path.join(__dirname, "public"),
			filename: "bundle.js"
		}
	};


Ici "__dirname" permet de r�cup�rer le chemin du dossier sur l'ordinateur de mani�re simple, la fonction "path.join()" sert � ajouter "public" � notre chemin/path.

"filename" peut porter le nom que l'on d�sire, mais "bundle.js" est une convention.


Dans "package.json" sur notre script "build" on peut ajouter "--watch" (provient de live-server) � "webpack" pour que Live-server traque le fichier et mette � jour directement dans le navigateur l'application.

Enfin dans notre fichier "index.html" on peut supprimer nos liens vers des scripts externes, on pourra les charger directement dans Webpack, le seul script � garder est un lien vers "bundle.js" qui effectuera toute la magie.



Si on utilise "asDefault" lors de l'import il n'est pas n�cessaire de nommer la valeur telle qu'elle est dans le fichier qui l'exporte, vu qu'elle est par d�faut elle sera reconnue peu importe le nom qu'on lui donne.


Pour parametrer Babel avec Webpack, dans le fichier "webpack.config.js" on ajoute :

	},
		module: {
			rules: [{
				loader: 'babel-loader',
				test: /\.js$/,
				exclude: /node-modules/
			}]
		}

Et on cr�e un fichier ".babelrc" � la racine dans lequel on inscrit :

	{
		"presets": [
			"env",
			"react"
		]
	}


En installant "transform-class-properties" il n'est plus n�cessaire de s'encombrer avec les "constructor() {}"


// CSS //

Pour ajouter le traitement des fichiers CSS � Webpack on ajoute dans "rules" :

	rules: [{
			loader: 'babel-loader',
			test: /\.js$/,
			exclude: /node_modules/
		}, 
// Ces lignes ci-dessous :
		{
			test: /\.css$/
		}]

Et on ajoute les packages suivants :

	yarn add style-loader@0.18.2 css-loader@0.28.4

Puis dans "app.js" on ajoute cette ligne :

	import './styles/styles.css';

Et enfin on termine dans la config Webpack en rajoutant cela :

	test: /\.css$/,
	use: [
		'style-loader',
		'css-loader'
	]


// SCSS //

Pour faire l'utilisation de SCSS on ajoute les packages suivants :

	yarn add sass-loader@6.0.6 node-sass@4.5.3

Et on ira simplement rajouter � "css" un "s" qui donnera "scss" dans "app.js", "webpack.config" et dans notre dossier "styles"

Et dans Webpack on ajoute simplement :

	use: [
		'style-loader',
		'css-loader',
		'sass-loader'


// REFACTORING //


BEM : Block element modifier

Rajouter "?" dans : "test: /\.s?css$/," permet d'utiliser les fichiers "css" et "scss"

Ajouter Normalize.css permet un affichage �gal dans tous les navigateurs /!\ Important /!\


space-between : Objets align�s de chaque c�t�.
space-around : Espace distribu� autour des objets. 




// REACT-ROUTER //



Pour avoir plusieurs pages.

On entre : 

	yarn add react-router-dom@4.2.2

On importe : 

	import { BrowserRouter, Route } from 'react-router-dom'

Et on ajoute dans "webpack.config.js" :

	devServer: {
		contentBase: path.join(__dirname, "public"),
		historyApiFallback: true

Et pour manipuler :

	const HelpPage = () => (
		<div>
			This is from my Help Page
		</div>
	);

	const routes = (
		<BrowserRouter>
			<div>
				<Route path="/" component={ExpenseDashboardPage} exact={true} />
				<Route path="/help" component={HelpPage} />
			</div>
		</BrowserRouter>
	);


	ReactDOM.render(routes, document.getElementById("app"));

"exact={true}" permet d'�viter que le rendu de "/" apparaisse sur les autres pages.


Pour cr�er une page 404 :

	<Switch>
		<Route path="/" component={ExpenseDashboardPage} exact={true} />
		<Route component={NotFoundPage} />
	</Switch>

En ajoutant Switch dans "import" on peut dire � notre app d'arr�ter de chercher la bonne route/lien d�s qu'il y a un match, ce qui permet en cas de non match d'envoyer la page 404, car on ne lui a donn� aucun lien sp�cifique, elle apparaitra donc � chaque fois si il n'y a eu aucun match avant, si on ne met pas "Switch" en place, m�me si il y a un match, l'application continuerait � en chercher d'autres et afficherait la page 404 en plus du reste � chaque fois.



Pour les liens on ajoute Link ou NavLink dans notre "import" et on fonctionne ainsi :

	const Header = () => (
		<header>
			<NavLink to ="/" activeClassName="is-active" exact={true}>Dashboard</NavLink>
			<NavLink to ="/help" activeClassName="is-active">Help</NavLink>
		</header>
	);

activeClassName sert � d�finir une classe, ici "is-active" qu'on ajoute dans notre fichier css "base" pour d�finir quel lien est actif. On utilise �galement "exact={true}" pour �viter que le lien avec "/" soit tout le temps actif.

React-Router se distingue des Router c�t� serveur du 
fait qu'il n'est pas n�cessaire d'envoyer une requ�te au serveur et donc recharger la page, tout s'effectue instantann�ment.


// REDUX //

Installation :

	yarn add redux@3.7.2


Pour avoir des ID uniques on installe :

	yarn add uuid


Installation plugin Babel pour la technique "spread" :

	yarn add babel-plugin-transform-object-rest-spread

Dans Babelrc : 

	"plugins": [
		"transform-class-properties",
		"transform-object-rest-spread"
	]


React-redux :

 	yarn add react-redux@5.0.5


 Pour ajouter un Date-Picker :

  	yarn add moment@2.18.1 react-dates@12.7.0 react-addons-shallow-compare@15.6.0




 Le constructor ici permet d'avoir acc�s � l'objet tant pour l'ajout que l'�dition :

 	constructor(props) {
		super(props);

		this.state = {
			description: props.expense ? props.expense.description : '',
			note: props.expense ? props.expense.note : '',
			amount: props.expense ? (props.expense.amount / 100).toString() : '',
			createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
			calendarFocused: false,
			error: ''
		};
	}





	// JEST TEST //


Installation :

	yarn add jest@20.0.4

Dans package.json :

	"test": "jest"


On ajoute un dossier "tests" avec un ficher "add.test.js", on ajoutera toujours .test dans le nom du fichier pour qu'il soit d�tect� par Jest.

On tape "yarn test -- --watch" pour que Jest fasse les tests en temps r�el.




Pour acc�der aux components dans nos tests :

	yarn add react-test-renderer@16.0.0



	yarn add enzyme@3.0.0 enzyme-adapter-react-16@1.0.0 raf@3.3.2

On cr�e un fichier � la source de test nomm� : setupTests.js :

	import Enzyme from 'enzyme';
	import Adapter from 'enzyme-adapter-react-16';

	Enzyme.configure({
		adapter: new Adapter()
	});

Et � la source de l'application "jest.config.json" :

	{
		"setupFiles": [
			"raf/polyfill",
			"<rootDir>/src/tests/setupTests.js"
		]
	}


Et on modifie dans package.json :

	"test": "jest --config=jest.config.json"



	yarn add enzyme-to-json@3.0.1


Dans le cas ou "moment" pose un probl�me au niveau des snapshots :

On cr�e un dossier "__mocks__" dans "tests" avec un fichier "moment.js" :

	const moment = require.requireActual('moment');

	export default (timestamp = 0) => {
		return moment(timestamp);
	};




// GIT //


git init : Pour initier Git dans notre projet

.gitignore : Fichier pour exclure certains dossiers ou fichiers de la sauvegarde.


