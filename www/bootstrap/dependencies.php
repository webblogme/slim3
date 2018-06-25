<?php 

// Fetch DI Container
$container = $app->getContainer();


// DATABASE
$capsule = new \Illuminate\Database\Capsule\Manager;
$capsule->addConnection($container['settings']['db']);

$capsule->setAsGlobal();
$capsule->bootEloquent();

$container['db'] = function ($container) use ($capsule) {
	return $capsule;
};


// TWIG
$container['view'] = function ($container) {
    
	$view = new \Slim\Views\Twig(__DIR__ . '/../resources/views', [
		'cache' => false,
    ]);

    $view->addExtension(new \Slim\Views\TwigExtension(
		$container->router,
		$container->request->getUri()
	));
	
	$view->addExtension(new Twig_Extension_Debug());
	$view->addExtension(new Twig_Extensions_Extension_Text());
	
    return $view;
};


// MONOLOG
$container['logger'] = function ($c) {
    $settings = $c->get('settings');
    $logger = new Monolog\Logger($settings['logger']['name']);
    $logger->pushProcessor(new Monolog\Processor\UidProcessor());
    $logger->pushHandler(new Monolog\Handler\StreamHandler($settings['logger']['path'], Monolog\Logger::DEBUG));
    return $logger;
};


// CONTROLLER
$container['HomeController'] = function ($container) {
	return new \App\Controllers\HomeController($container);
};




?>