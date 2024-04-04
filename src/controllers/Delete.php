<?php

namespace App\Controllers;

use PDO;
use \PDOException;

class Delete {
    private $db;

    public function __construct($host, $port, $dbname, $user, $password) {
        try {
            $this->db = new PDO(
                'mysql:host=' . $host . ';port=' . $port . ';dbname=' . $dbname,
                $user,
                $password
            );
            $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->db->setAttribute(PDO::ATTR_PERSISTENT, false);
        } catch (PDOException $e) {
            echo 'Connexion échouée : ' . $e->getMessage();
            exit();
        }
    }

    public function fetchMessages() {

        $query = "SELECT id, messages_id, heure, message_type, image FROM messages";
        $response = $this->db->query($query);

        $messages = $response->fetchAll(PDO::FETCH_ASSOC);

        foreach ($messages as $message) {
            echo "ID: " . $message['id'] . "<br>";
            echo "Message ID: " . $message['messages_id'] . "<br>";
            echo "Heure: " . $message['heure'] . "<br>";
            echo "Type de message: " . $message['message_type'] . "<br>";
            echo "Image: " . $message['image'] . "<br>";
            echo "<br>";
        }
    }
}