<?php session_start();

require __DIR__ . '/../vendor/autoload.php';

$app = new \Slim\App([

	'settings' => [ // Slim Settings
		'displayErrorDetails' => true,
		'determineRouteBeforeAppMiddleware' => false,
	'logger' => [
		'name' => 'app',
		'path' => __DIR__ . '/../resources/app.log',
	],
	'db' => [
		'driver' => 'mysql',
		//'host' => '192.168.99.100',
		//'host' => '192.168.1.76',
		'host' => 'localhost',
		'database' => 'blog',
		'username' => 'root',
		'password' => 'root',
		'charset'   => 'utf8',
		'collation' => 'utf8_unicode_ci',
		'prefix'    => '',
    ]

	]

]);

require __DIR__ . '/../bootstrap/dependencies.php';
require __DIR__ . '/../app/routes.php';

?>