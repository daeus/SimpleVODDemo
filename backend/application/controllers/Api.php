<?php

defined('BASEPATH') OR exit('No direct script access allowed');

require_once(APPPATH . 'libraries/REST_Controller.php');

class Api extends REST_Controller {

	public function __construct()
	{   
		parent::__construct();
		header('Access-Control-Allow-Origin: *');
		$this->load->library('session');
	}   

	public function index_get()
	{   
		if(isset($_SESSION['videos']))
		{   
			$this->response($_SESSION['videos']);
		} else {
			$this->response(array());
		}   
	}   

	public function index_post()
	{   
		$saved_data = (isset($_SESSION['videos']))? $_SESSION['videos']:array();
		$saved_data[] = $this->input->post('title');
		$this->session->set_userdata('videos', $saved_data);
		$this->response(array('success' => true));
	}   
}

