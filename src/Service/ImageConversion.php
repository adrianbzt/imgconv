<?php

namespace App\Service;

use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\Filesystem\Exception\IOExceptionInterface;
use Symfony\Component\Finder\Finder;

class ImageConversion
{
    //TODO: replace it with a real image convertor
    public function convertImage($files)
    {

        $convertedImages = [];

        foreach ($files as $fileData) {

            $filePath = $fileData['tmp_name'];
            $exploded = explode('.', $fileData['name']);

            $fileExtension = end($exploded);

            $fileNameNoExt = substr($fileData['name'], 0, strlen($fileExtension) + 2);
            $fileNameWithExt = $fileData['name'];

            $saveToLocation = "../public/download/images/jpg/" . $fileNameNoExt . '.jpg';

            $convertedImages[] = $this->makeConversion($filePath, $saveToLocation, $fileExtension, $fileNameNoExt);

        }

        //TODO: just for debugging purposes
        sleep(2);

        return $convertedImages;

    }

    private function makeConversion($targetFile, $saveToLocation, $extension, $fileNameNoExt)
    {

        list($width, $height) = getimagesize($targetFile);

        $newImage = '';

        switch ($extension) {
            case 'png':
                $newImage = imagecreatefrompng($targetFile);
                break;
            default:
                break;
        }

        $imageCreator = imagecreatetruecolor($width, $height);
        imagecopyresampled($imageCreator, $newImage, 0, 0, 0, 0, $width, $height, $width, $height);

        // this will try to download the image instead of sending the return array
        //header("Content-Type: image/jpg");
        imagejpeg($imageCreator, $saveToLocation, 80);
        imagedestroy($newImage);

        $toReturn = array(
            'fileLocation' => $saveToLocation,
            'fileName' => $fileNameNoExt,
            'extension' => $extension
        );

        return $toReturn;

    }
}