<?php

class ControllerApiFilterTeilen extends Controller {

	public $type = '';

	// public function __construct() {
	// 	$get = $this->cleanupArray($this->request->get);

	// 	if(key_exists('type',$get)) {
	// 		$this->type = $this->cleanupArray($get['type']);
	// 	} else {
	// 		$this->type = return false;
	// 	}
	// }
	
	public function index() {

		//$get = $this->cleanupArray($this->request->get);
		$get = $this->cleanupArray($this->request->get);

		$this->type = $_GET['type'];
		// if(key_exists('type',$get)) {
		// 	$this->type = $this->cleanupArray($get['type']);
		// } else {
		// 	$this->type = return false;
		// }

		if(key_exists('atts',$get)) {
			$get['atts'] = $this->cleanupArray($get['atts']);
		}

		$this->load->model('custom/filter');

		$json = $this->model_custom_filter->getProducts($get);

		if (isset($this->request->server['HTTP_ORIGIN'])) {
			$this->response->addHeader('Access-Control-Allow-Origin: ' . $this->request->server['HTTP_ORIGIN']);
			$this->response->addHeader('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
			$this->response->addHeader('Access-Control-Max-Age: 1000');
			$this->response->addHeader('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
		}

		$this->response->addHeader('Content-Type: application/json');
		$this->response->setOutput(json_encode($json));
	}


	public function get_attributes() {

		$get = $this->cleanupArray($this->request->get);

		if(key_exists('atts',$get)) {

			$get['atts'] = $this->cleanupArray($get['atts']);
		}

		$this->load->model('custom/filter');

		$json = $this->model_custom_filter->getAttributes($get);

		if (isset($this->request->server['HTTP_ORIGIN'])) {
			$this->response->addHeader('Access-Control-Allow-Origin: ' . $this->request->server['HTTP_ORIGIN']);
			$this->response->addHeader('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
			$this->response->addHeader('Access-Control-Max-Age: 1000');
			$this->response->addHeader('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
		}

		$this->response->addHeader('Content-Type: application/json');
		$this->response->setOutput(json_encode($json));
	}


	public function get_options() {

		$get = $this->cleanupArray($this->request->get);

		if(key_exists('atts',$get)) {

			$get['atts'] = $this->cleanupArray($get['atts']);
		}

		$this->load->model('custom/filter');

		$json = $this->model_custom_filter->getOptions($get);

		if (isset($this->request->server['HTTP_ORIGIN'])) {
			$this->response->addHeader('Access-Control-Allow-Origin: ' . $this->request->server['HTTP_ORIGIN']);
			$this->response->addHeader('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
			$this->response->addHeader('Access-Control-Max-Age: 1000');
			$this->response->addHeader('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
		}

		$this->response->addHeader('Content-Type: application/json');
		$this->response->setOutput(json_encode($json));
	}


	public function get_inquiry() {

		$get = $this->cleanupArray($this->request->get);

		unset($get['route']);

		if(key_exists('atts',$get)) {

			$get['atts'] = $this->cleanupArray($get['atts']);
		}

		$this->load->model('custom/filter');

		$json = $this->model_custom_filter->InquiryFilter($get);

		if (isset($this->request->server['HTTP_ORIGIN'])) {
			$this->response->addHeader('Access-Control-Allow-Origin: ' . $this->request->server['HTTP_ORIGIN']);
			$this->response->addHeader('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
			$this->response->addHeader('Access-Control-Max-Age: 1000');
			$this->response->addHeader('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
		}

		$this->response->addHeader('Content-Type: application/json');
		$this->response->setOutput(json_encode($json));
	}


	public function get_origin_url() {

		$keyword = $this->request->get['keyword'];

		$json = $this->db->query("
			SELECT ua.query
			FROM " . DB_PREFIX . "url_alias ua
			WHERE ua.keyword = '$keyword'
		")->row;

		if (isset($this->request->server['HTTP_ORIGIN'])) {
			$this->response->addHeader('Access-Control-Allow-Origin: ' . $this->request->server['HTTP_ORIGIN']);
			$this->response->addHeader('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
			$this->response->addHeader('Access-Control-Max-Age: 1000');
			$this->response->addHeader('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
		}

		$this->response->addHeader('Content-Type: application/json');
		$this->response->setOutput(json_encode($json['query']));
	}




	public function get_marka_data() {

		$this->type = $_GET['type'];

		$query = $this->db->query("
			SELECT kk.marka
			FROM " . DB_PREFIX . $this->type . " kk
			GROUP BY kk.marka
		")->rows;

		$data = array_map(function($row){
			return array('value'=>$row['marka'],'label'=>$row['marka']);
		}, $query);

		if (isset($this->request->server['HTTP_ORIGIN'])) {
			$this->response->addHeader('Access-Control-Allow-Origin: ' . $this->request->server['HTTP_ORIGIN']);
			$this->response->addHeader('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
			$this->response->addHeader('Access-Control-Max-Age: 1000');
			$this->response->addHeader('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
		}

		$this->response->addHeader('Content-Type: application/json');
		$this->response->setOutput(json_encode($data));
	}




	public function get_model_data() {

		$get = $this->cleanupArray($this->request->get);

		$antrieb = 'front';

		$where = "";
		if(key_exists('marka',$get)) {
			$marka = $get['marka'];
			$where .= "AND kk.marka = '$marka' ";
		}
		if(key_exists('ccm',$get)) {
			$ccm = $get['ccm'];
			$where .= "AND kk.ccm = '$ccm' ";
		}
		if(key_exists('model',$get)) {
			$model = $get['model'];
			$where .= "AND kk.model = '$model' ";
		}
		if(key_exists('year',$get)) {
			$year = $get['year'];
			$where .= "AND kk.year = '$year' ";
		}


		$group_by = "GROUP BY kk.marka, kk.ccm, kk.model, kk.year";

		if($this->type === 'bremsbelage') {
			if(key_exists('antrieb',$get)) {
				$antrieb = $get['antrieb'];
				$where .= "AND kk.antrieb = '$antrieb' ";
			}
			$group_by .= ", kk.'$antrieb'";
		}

		$query = $this->db->query("
			SELECT *
			FROM " . DB_PREFIX . $get['type'] . " kk
			WHERE kk.id != 0
			$where
			$group_by
		")->rows;


		$ccms = $models = $years = [];
		//
		foreach ($query as $key => $q) {
			array_push($ccms, $q['ccm']);
			array_push($models, $q['model']);
			array_push($years, $q['year']);
			// array_push($products, $q['product']);
		}
		//
		$ccms = array_unique($ccms);
		$models = array_unique($models);
		$years = array_unique($years);
		// $products = array_unique($products);

		natsort($ccms);
		natsort($models);
		natsort($years);
		// natsort($products);
		//
		foreach (array_values($ccms) as $key => $q) {
			$data['vehicle']['ccm'][$key]['value'] = $q;
			$data['vehicle']['ccm'][$key]['label'] = $q;
		}
		foreach (array_values($models) as $key => $q) {
			$data['vehicle']['model'][$key]['value'] = $q;
			$data['vehicle']['model'][$key]['label'] = $q;
		}
		foreach (array_values($years) as $key => $q) {
			$data['vehicle']['year'][$key]['value'] = $q;
			$data['vehicle']['year'][$key]['label'] = $q;
		}


		if (isset($this->request->server['HTTP_ORIGIN'])) {
			$this->response->addHeader('Access-Control-Allow-Origin: ' . $this->request->server['HTTP_ORIGIN']);
			$this->response->addHeader('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
			$this->response->addHeader('Access-Control-Max-Age: 1000');
			$this->response->addHeader('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
		}

		$this->response->addHeader('Content-Type: application/json');
		$this->response->setOutput(json_encode($data));
	}






	public function get_product_data() {

		$get = $this->cleanupArray($this->request->get);

		$this->type = $_GET['type'];


		$where = "WHERE ";
		$group_by = "GROUP BY ";
		$antrieb = 'front';

		if(key_exists('marka',$get)) {
			$marka = $get['marka'];
			$group_by .= "kk.marka";
			$where .= "kk.marka = '$marka' ";
		}
		if(key_exists('ccm',$get)) {
			$ccm = $get['ccm'];
			$group_by .= ", kk.ccm";
			$where .= "AND kk.ccm = '$ccm' ";
		}
		if(key_exists('model',$get)) {
			$model = $get['model'];
			$group_by .= ", kk.model";
			$where .= "AND kk.model = '$model' ";
		}
		if(key_exists('year',$get)) {
			$year = $get['year'];
			$group_by .= ", kk.year";
			$where .= "AND kk.year = '$year' ";
		}


		if($this->type === 'bremsbelage') {
			if(key_exists('antrieb',$get)) {
				$antrieb = $get['antrieb'];
			}
			$group_by .= ", kk.product_'$antrieb'";
		} else {
			$group_by .= ", kk.product";
		}


		$select = "SELECT kk.product_id ";

		if($this->type === 'bremsbelage') {
			$select = "SELECT kk.product_id_".$antrieb." ";
		}

		$query = $this->db->query(
			$select . 
			"FROM " . DB_PREFIX . $this->type . " kk
			$where
			$group_by
		")->rows;

		$this->load->model('custom/product');

		$prodsCont = [];

		foreach ($query as $key => $q) {
			$prodsCont[] = $q['product_id'];
		}

		


		$sort = 'pd.name';
		if(key_exists('sort',$get)) {
			$sort = $get['sort'];
		}

		$order = 'ASC';
		if(key_exists('order',$get)) {
			$order = $get['order'];
		}

		$limit = isset($get['limit']) ? $get['limit'] : 12;
		$offset = (isset($get['page']) && $get['page'] !== 0) ? "OFFSET " . ($limit * $get['page']) : "";
		// $offset = (isset($get['page']) && $get['page'] === 0) ? "OFFSET " . ($limit * $get['page']) . " ROWS" : "";


		//$json['result'] = $prodsCont;
		$json['result'] = $this->getProducts(implode(',',$prodsCont), $sort, $order, $limit, $offset);
		$json['count'] = count($prodsCont);
		$json['totalPages'] = ceil($json['count'] / $limit);

		$json['query'] = $get;
		//$json['query']['limit'] = $limit;


		if (isset($this->request->server['HTTP_ORIGIN'])) {
			$this->response->addHeader('Access-Control-Allow-Origin: ' . $this->request->server['HTTP_ORIGIN']);
			$this->response->addHeader('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
			$this->response->addHeader('Access-Control-Max-Age: 1000');
			$this->response->addHeader('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
		}

		$this->response->addHeader('Content-Type: application/json');
		$this->response->setOutput(json_encode($json));
		//var_dump($sve);
	}














	function getType() {
		$get = $this->cleanupArray($this->request->get);

		if(key_exists('type',$get)) {
			return $this->cleanupArray($get['type']);
		} else {
			return false;
		}
	}

	function cleanupArray($get) {
		// filtriraj GET i izbaci one koji nemaju vrednost
	   foreach ($get as $key => $g) {
	      if($g === NULL || $g === '' || $g === "") {
	         unset($get[$key]);
	      }
	   }
		return $get;
	}

	function makeUniqueArray($niz) {
		$unique = array();
		foreach($niz as $n) {
			if(!in_array($n, $unique)) {
				$unique[] = $n;
			}
		}
		return $unique;
	}







	public function getProducts($product_ids, $sort, $order, $limit, $offset) {

		$this->load->model('tool/image');
      $this->load->model('custom/url');

      $query = $this->db->query("
      	SELECT *, p.model, p.price, p.manufacturer_id, p.product_id, p.image,
      	cd.name AS cat_name,
         pd.name AS name,
         m.name AS brand_name,
         pd.meta_description AS meta_description,
      	(SELECT price
            FROM cc_product_discount pd2 WHERE pd2.product_id = p.product_id AND pd2.quantity = '1' AND ((pd2.date_start = '0000-00-00' OR pd2.date_start < NOW()) AND (pd2.date_end = '0000-00-00' OR pd2.date_end > NOW())) ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1) AS discount,
         (SELECT AVG(rating) AS total
            FROM cc_review r1 WHERE r1.product_id = p.product_id AND r1.status = '1' GROUP BY r1.product_id) AS rating,
         (SELECT GROUP_CONCAT(pa2.text)
            FROM cc_product_attribute pa2
            WHERE pa2.product_id = p.product_id) AS atts,
         (SELECT GROUP_CONCAT(ad2.name)
            FROM cc_product_attribute pa2
            LEFT JOIN cc_attribute_description ad2 ON pa2.attribute_id = ad2.attribute_id
            WHERE pa2.product_id = p.product_id) AS att_names
      	FROM cc_product p
      	LEFT JOIN cc_product_attribute pa ON p.product_id = pa.product_id
			LEFT JOIN cc_attribute_description ad ON pa.attribute_id = ad.attribute_id
			LEFT JOIN cc_product_description pd ON p.product_id = pd.product_id
			LEFT JOIN cc_product_to_category pc ON p.product_id = pc.product_id
			LEFT JOIN cc_category_description cd ON pc.category_id = cd.category_id
			LEFT JOIN cc_manufacturer m ON p.manufacturer_id = m.manufacturer_id
			LEFT JOIN cc_category c ON pc.category_id = c.category_id
			WHERE p.product_id IN (".$product_ids.")
			GROUP BY p.product_id
			ORDER BY " . $sort .' '. $order . "
			LIMIT " . $limit .' '. $offset . "
      ");


		if ($query->num_rows) {

			$niz = [];

			foreach ($query->rows as $i => $q) {
				
				$att_vals = explode(",", $q['atts']);
				$att_keys = explode(",", $q['att_names']);
				$price = ($q['discount'] ? $q['discount'] : $q['price']);
				$priceRound = number_format(round($price * 2, 1) / 2, 2);

				$image = $this->model_tool_image->resize($q['image'], 260, 240);
				if(!$image) {
					$image = 'image/no_image.svg';
				}

				$url = $this->model_custom_url->rewrite('product_id='.$q['product_id']);
				if(!$url) {
					$url = 'index.php?route=product/product&product_id='.$q['product_id'];
				}
				$cat_url = $this->model_custom_url->rewrite('category_id='.$q['category_id']);
				if(!$cat_url) {
					$cat_url = 'index.php?route=product/category&path='.$q['category_id'];
				}
				$brand_url = $this->model_custom_url->rewrite('manufacturer_id='.$q['manufacturer_id']);
				if($brand_url == false) {
					$brand_url = 'index.php?route=product/manufacturer/info&manufacturer_id='.$q['manufacturer_id'];
				}

				$niz[] = array(
					'id'           =>      $q['product_id'],
					'image'        =>      $image,
					'url'          =>      $url,
					'brand_id'     =>      $q['manufacturer_id'],
					'brand_name'   =>      $q['brand_name'],
					'brand_url'    =>      $brand_url,
					'cat_id'       =>      $q['category_id'],
					'cat_name'     =>      $q['cat_name'],
					'cat_parent'   =>      $q['parent_id'],
					'cat_url'      =>      $cat_url,
					'atts'         =>      array_combine($att_keys, $att_vals),
					'price'        =>      $priceRound,
					'points'       =>      $q['points'],
					'rating'       =>      round($q['rating'])
				);

			}
			return $niz;
			
		} else {
			return false;
		}

	}

}
