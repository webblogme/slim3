<?php

namespace App\Controllers;

use Slim\Views\Twig as View;


class HomeController extends Controller {

	public function index($request, $response) {
		

		//$article = $this->db->table('article')->find(1);
		
		//return $this->container->view->render($response, 'sql.twig.php');
		
		
		return $this->container->view->render($response, 'blank.twig.php');
		
	}

}

?>