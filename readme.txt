Pour installer un serveur en local :

	yarn global add live-server

Pour lancer le serveur et notre index.html :

	live-server public


Pour installer Babel

	yarn global add babel-cli 
	ou 
	npm install -g babel-cli@6.24.1


Pour initialiser notre application avec yarn (dans le style de "npm init" pour générer notre "package.json") :

	yarn init


Permet d'installer les dépendances nécessaires au bon fonctionnement de Babel avec React

	yarn add babel-preset-react babel-preset-env


Cette commande va faire le lien entre notre fichier src/app.js dans lequel on développe l'application avec scripts/app.js, en résumé Babel va compiler notre code React dans le fichier scripts/app.js (fichier de sortie / --out-file) pour le rendre compréhensible du navigateur :

	babel src/app.js --out-file=public/scripts/app.js --presets=env,react

Enfin pour que cela se mette à jour automatiquement on relance la même commande suivi de "--watch" (il faut ouvrir par la suite une nouvelle invite de commande, babel se servira de celle-ci comme lorsque le serveur est lancé) :

	babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch


Permet de reinstaller nos dépendances (présentes dans "package.json") :

	yarn install


Permet de directement effectuer la modification dans l'array : 

	.map()


Permet de stopper le rechargement de la page :

	e.preventDefault();

Les "  ``  " permettent d'insérer au sein du "string" du javascript : `ceci est un ${this.test}`

Permet d'accéder aux informations contenues dans la "class" parent : 

	super(valeur);



.bind() va nous permettre d'accéder à la fonction et sa valeur :

	const obj = {
		name: "Vikram",
		getName() {
			return this.name;
		}
	}

	const getName = obj.getName.bind(obj);

	console.log(getName());


Permet de modifier l'état de la valeur précédente (setState), par exemple ici avec un compteur de base à 0 (prevState) :

	this.setState((prevState) => {
		return {
			count: prevState.count + 1
		};
	});


Les scripts à l'intérieur de "package.json" permettent d'éviter d'installer globalement nos packages ou d'effectuer certaines tâches longues ou répétitives :

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

Pour parametrer Webpack il faut un "input"/"entry" (dossier d'où vient le code) et un "output" (dossier ou ressortira le code une fois transformé) :

	const path = require("path");


	module.exports = {
		entry: "./src/app.js",
		output: {
			path: path.join(__dirname, "public"),
			filename: "bundle.js"
		}
	};


Ici "__dirname" permet de récupérer le chemin du dossier sur l'ordinateur de manière simple, la fonction "path.join()" sert à ajouter "public" à notre chemin/path.

"filename" peut porter le nom que l'on désire, mais "bundle.js" est une convention.


Dans "package.json" sur notre script "build" on peut ajouter "--watch" (provient de live-server) à "webpack" pour que Live-server traque le fichier et mette à jour directement dans le navigateur l'application.

Enfin dans notre fichier "index.html" on peut supprimer nos liens vers des scripts externes, on pourra les charger directement dans Webpack, le seul script à garder est un lien vers "bundle.js" qui effectuera toute la magie.



Si on utilise "asDefault" lors de l'import il n'est pas nécessaire de nommer la valeur telle qu'elle est dans le fichier qui l'exporte, vu qu'elle est par défaut elle sera reconnue peu importe le nom qu'on lui donne.


Pour parametrer Babel avec Webpack, dans le fichier "webpack.config.js" on ajoute :

	},
		module: {
			rules: [{
				loader: 'babel-loader',
				test: /\.js$/,
				exclude: /node-modules/
			}]
		}

Et on crée un fichier ".babelrc" à la racine dans lequel on inscrit :

	{
		"presets": [
			"env",
			"react"
		]
	}


En installant "transform-class-properties" il n'est plus nécessaire de s'encombrer avec les "constructor() {}"


// CSS //

Pour ajouter le traitement des fichiers CSS à Webpack on ajoute dans "rules" :

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

Et on ira simplement rajouter à "css" un "s" qui donnera "scss" dans "app.js", "webpack.config" et dans notre dossier "styles"

Et dans Webpack on ajoute simplement :

	use: [
		'style-loader',
		'css-loader',
		'sass-loader'


// REFACTORING //


BEM : Block element modifier

Rajouter "?" dans : "test: /\.s?css$/," permet d'utiliser les fichiers "css" et "scss"

Ajouter Normalize.css permet un affichage égal dans tous les navigateurs /!\ Important /!\


space-between : Objets alignés de chaque côté.
space-around : Espace distribué autour des objets. 




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

"exact={true}" permet d'éviter que le rendu de "/" apparaisse sur les autres pages.


Pour créer une page 404 :

	<Switch>
		<Route path="/" component={ExpenseDashboardPage} exact={true} />
		<Route component={NotFoundPage} />
	</Switch>

En ajoutant Switch dans "import" on peut dire à notre app d'arrêter de chercher la bonne route/lien dès qu'il y a un match, ce qui permet en cas de non match d'envoyer la page 404, car on ne lui a donné aucun lien spécifique, elle apparaitra donc à chaque fois si il n'y a eu aucun match avant, si on ne met pas "Switch" en place, même si il y a un match, l'application continuerait à en chercher d'autres et afficherait la page 404 en plus du reste à chaque fois.



Pour les liens on ajoute Link ou NavLink dans notre "import" et on fonctionne ainsi :

	const Header = () => (
		<header>
			<NavLink to ="/" activeClassName="is-active" exact={true}>Dashboard</NavLink>
			<NavLink to ="/help" activeClassName="is-active">Help</NavLink>
		</header>
	);

activeClassName sert à définir une classe, ici "is-active" qu'on ajoute dans notre fichier css "base" pour définir quel lien est actif. On utilise également "exact={true}" pour éviter que le lien avec "/" soit tout le temps actif.

React-Router se distingue des Router côté serveur du 
fait qu'il n'est pas nécessaire d'envoyer une requête au serveur et donc recharger la page, tout s'effectue instantannément.


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




 Le constructor ici permet d'avoir accès à l'objet tant pour l'ajout que l'édition :

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


On ajoute un dossier "tests" avec un ficher "add.test.js", on ajoutera toujours .test dans le nom du fichier pour qu'il soit détecté par Jest.

On tape "yarn test -- --watch" pour que Jest fasse les tests en temps réel.




Pour accéder aux components dans nos tests :

	yarn add react-test-renderer@16.0.0



	yarn add enzyme@3.0.0 enzyme-adapter-react-16@1.0.0 raf@3.3.2

On crée un fichier à la source de test nommé : setupTests.js :

	import Enzyme from 'enzyme';
	import Adapter from 'enzyme-adapter-react-16';

	Enzyme.configure({
		adapter: new Adapter()
	});

Et à la source de l'application "jest.config.json" :

	{
		"setupFiles": [
			"raf/polyfill",
			"<rootDir>/src/tests/setupTests.js"
		]
	}


Et on modifie dans package.json :

	"test": "jest --config=jest.config.json"



	yarn add enzyme-to-json@3.0.1


Dans le cas ou "moment" pose un problème au niveau des snapshots :

On crée un dossier "__mocks__" dans "tests" avec un fichier "moment.js" :

	const moment = require.requireActual('moment');

	export default (timestamp = 0) => {
		return moment(timestamp);
	};




// GIT //


git init : Pour initier Git dans notre projet

.gitignore : Fichier pour exclure certains dossiers ou fichiers de la sauvegarde.


