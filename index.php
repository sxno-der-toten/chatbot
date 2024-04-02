<?php

require 'vendor/autoload.php';

use App\Router;
use App\Controllers\User;
use App\Controllers\Messages;
use App\Controllers\Bot;
use App\Controllers\Delete;

new Router([
  'user/:id' => User::class,
  'messages' => Messages::class,
  'bot'=>Bot::class,
  'delete'=>Delete::class
]);
