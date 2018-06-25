<?php 

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;


//TEST CONTROLLER
$app->get('/', 'HomeController:index');


//TEST LOG
$app->get('/hello/{name}', function (Request $request, Response $response){
	$name = $request->getAttribute('name');
    $response->getBody()->write("Hello, ".$name);
    $this->get('logger')->info("mySlim '/' route");
    return $response;
});


//TEST WITH DATA
$app->get('/do/{pagename}/{pagenumber}', function ($request, $response, $args) {
    return $this->view->render($response, 'home.twig.php', [
        'name' => $args['pagename'],
		'pagenumber' => $args['pagenumber'],
		'datas' => [
			array("name"=>"Madonna","email"=>"ac.mattis@ipsumcursus.org","register_date"=>"2017-08-19 16:09:04","desc"=>"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec urna et arcu imperdiet ullamcorper. Duis at lacus. Quisque purus sapien, gravida non, sollicitudin a, malesuada id, erat. Etiam vestibulum massa rutrum magna. Cras convallis convallis dolor. Quisque tincidunt pede ac urna. Ut","age"=>30),
			array("name"=>"Neve","email"=>"eu.odio.Phasellus@perconubianostra.net","register_date"=>"2018-11-23 10:04:09","desc"=>"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec urna et arcu imperdiet ullamcorper. Duis at lacus. Quisque purus sapien, gravida non, sollicitudin a, malesuada id, erat. Etiam vestibulum massa rutrum magna. Cras convallis convallis","age"=>21),
			array("name"=>"Helen","email"=>"vel.arcu@Mauris.com","register_date"=>"2018-12-20 06:25:36","desc"=>"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec urna et arcu imperdiet ullamcorper. Duis at lacus. Quisque purus sapien,","age"=>24),
			array("name"=>"Signe","email"=>"pharetra.ut.pharetra@mollis.net","register_date"=>"2017-09-07 18:49:34","desc"=>"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec urna et arcu","age"=>36),
			array("name"=>"Jade","email"=>"nulla@lorem.net","register_date"=>"2018-03-09 13:12:39","desc"=>"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec urna et arcu","age"=>26),
			array("name"=>"Bell","email"=>"pellentesque.massa.lobortis@magna.com","register_date"=>"2018-09-03 07:36:44","desc"=>"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec urna et arcu imperdiet ullamcorper. Duis at lacus. Quisque purus","age"=>49),
			array("name"=>"Lilah","email"=>"molestie@sedorci.com","register_date"=>"2019-02-28 11:50:57","desc"=>"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec urna et arcu imperdiet ullamcorper. Duis at lacus. Quisque purus sapien,","age"=>37),
		]
    ]);
})->setName('profile');


?>