<?php 

namespace App\Controllers;

class Delete {
    public function delete($bdd) {
        $query = "SELECT * FROM post_it WHERE id=:id";
        $response = $bdd->prepare($query);
        $response->execute(['id' => $_GET['id']]);
        $data = $response->fetch();

        $deleteQuery = "DELETE FROM post_it WHERE id=:id";
        $deleteResponse = $bdd->prepare($deleteQuery);
        // Execute the deletion query
        $deleteResponse->execute(['id' => $_GET['id']]);
    }
}
