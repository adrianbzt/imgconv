<?php

namespace App\Services;

class ImageConversion
{
    //TODO: replace it with a real image convertor
    public function convertImage($files)
    {

        $convertedImages = [];

        foreach ($files as $filename) {
            $split = explode(".", $filename);

            if (!empty($split)) {
                $filename = $split[0];
                $extension = $split[1];
                if(strtolower($extension) === 'png') {
                    $convertedImages[$filename] = array(
                        "success" => 1,
                        "message" => "Success"
                    );
                } else {
                    $convertedImages[$filename] = array(
                        "success" => 0,
                        "message" => "Already JPG"
                    );
                }

            } else {
                $convertedImages['generic'] = array(
                    "success" => 0,
                    "message" => "Error"
                );
            }
        }

        //TODO: just for debugging purposes
        sleep(2);

        return $convertedImages;

    }
}