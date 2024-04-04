<?php

namespace App\Controllers;

use App\Models\SqlConnect;
use PDO;
use PDOException;

class Messages extends SqlConnect {
    protected array $params;
    protected string $reqMethod;

    public function __construct($params) {
        parent::__construct();
        $this->params = $params;
        $this->reqMethod = strtolower($_SERVER['REQUEST_METHOD']);

        $this->run();
    }

    protected function insertMessage() {
        try {
            $conv = 'bot' . $this->params['id'];
            $query = "INSERT INTO $conv (message, heure, type, image) VALUES (:message, :heure, :type, :image)";
            $statement = $this->db->prepare($query);
            $statement->execute([
                ':message' => $this->params['message'],
                ':heure' => $this->params['heure'],
                ':type' => $this->params['type'],
                ':image' => $this->params['image']
            ]);

            return ["success" => true, "message" => "Message envoyé avec succès"];
        } catch (PDOException $e) {
            return ["success" => false, "error" => "Erreur PDO : " . $e->getMessage()];
        }
    }

    protected function header() {
        header('Access-Control-Allow-Origin: *');
        header('Content-type: application/json; charset=utf-8');
    }

    protected function ifMethodExist() {
        $method = $this->reqMethod.'Messages';

        if (method_exists($this, $method)) {
            echo json_encode($this->$method());
            return;
        }

        header('HTTP/1.0 404 Not Found');
        echo json_encode([
            'code' => '404',
            'message' => 'Not Found'
        ]);
        return;
    }

    protected function run() {
        $this->header();
        $this->ifMethodExist();
    }
}