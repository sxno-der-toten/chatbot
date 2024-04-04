<?php

require 'vendor/autoload.php';

use App\Router;
use App\Controllers\User;
use App\Controllers\Messages;
use App\Controllers\Bot;
use App\Controllers\Delete;
use App\Controllers\Send;

new Router([
    'user/:id' => User::class,
    'messages/:id' => Messages::class,
    'bot' => Bot::class,
    'delete' => Delete::class,
    'send/:id' => Send::class,
]);