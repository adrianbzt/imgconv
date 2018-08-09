<?php

namespace App\Service;

use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\Filesystem\Exception\IOExceptionInterface;

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

            $this->makeConversion($filePath, $fileNameNoExt . '.jpg', $fileExtension);

//            echo '<pre>';
//            print_r($fileData);
//            print_r($filePath);
//            print_r($fileNameNoExt);
//            print_r($fileNameWithExt);
//            print_r($fileExtension);
//            die;

//            $split = explode(".", $filename);
//
//            if (!empty($split)) {
//                $filename = $split[0];
//                $extension = $split[1];
//                if (strtolower($extension) === 'png') {
//                    $convertedImages[$filename] = array(
//                        "success" => 1,
//                        "message" => "Success"
//                    );
//                } else {
//                    $convertedImages[$filename] = array(
//                        "success" => 0,
//                        "message" => "Already JPG"
//                    );
//                }
//
//            } else {
//                $convertedImages['generic'] = array(
//                    "success" => 0,
//                    "message" => "Error"
//                );
//            }
        }

        //TODO: just for debugging purposes
        sleep(2);

        return $convertedImages;

    }

    private function makeConversion($targetFile, $newFile, $extension)
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

        $ictc = imagecreatetruecolor($width, $height);
        imagecopyresampled($ictc, $newImage, 0, 0, 0, 0, $width, $height, $width, $height);
        header("Content-Type: image/jpg");
        imagejpeg($ictc, $newFile, 80);
        imagedestroy($newImage);

    }
}