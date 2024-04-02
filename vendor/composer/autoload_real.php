<?php

// autoload_real.php @generated by Composer

class ComposerAutoloaderInitac82ccd66a7ca8c0a508174b8817dee8
{
    private static $loader;

    public static function loadClassLoader($class)
    {
        if ('Composer\Autoload\ClassLoader' === $class) {
            require __DIR__ . '/ClassLoader.php';
        }
    }

    /**
     * @return \Composer\Autoload\ClassLoader
     */
    public static function getLoader()
    {
        if (null !== self::$loader) {
            return self::$loader;
        }

        spl_autoload_register(array('ComposerAutoloaderInitac82ccd66a7ca8c0a508174b8817dee8', 'loadClassLoader'), true, true);
        self::$loader = $loader = new \Composer\Autoload\ClassLoader(\dirname(__DIR__));
        spl_autoload_unregister(array('ComposerAutoloaderInitac82ccd66a7ca8c0a508174b8817dee8', 'loadClassLoader'));

        require __DIR__ . '/autoload_static.php';
        call_user_func(\Composer\Autoload\ComposerStaticInitac82ccd66a7ca8c0a508174b8817dee8::getInitializer($loader));

        $loader->register(true);

        return $loader;
    }
}
