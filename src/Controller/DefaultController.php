<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class DefaultController extends AbstractController
{
    /**
     * @Route("/", name="default")
     * @return Response
     * @throws \Exception
     */
    public function number()
    {
        $number = random_int(0, 100);

        return $this->render('layout.html.twig', array(
            'number' => $number,
        ));
    }

    /**
     * @Route("/convert/image")
     * @param Request $request
     * @return Response
     */

    public function convertImage(Request $request)
    {

        $files = $request->get('files');

        echo '<pre>';
        print_r($files);
        die;

        $extension = $request->get('extension');
        $filename = $request->get('filename');

        switch ($extension) {
            case 'jpg':
            case 'jpeg':
                $image = imagecreatefromjpeg($filename);
                break;
            case 'gif':
                $image = imagecreatefromgif($filename);
                break;
            case 'png':
                $image = imagecreatefrompng($filename);
                break;
        }

        $response = new Response(
            json_encode($image, JSON_PRETTY_PRINT)
        );

        $response->headers->set('Content-Type', 'application/json');

        return $response;
    }

    /**
     * @Route("/uploadImages")
     * @param Request $request
     * @return Response
     */
    public function insertImages(Request $request)
    {


        $entityManger = $this->getDoctrine()->getManager();
        $repository = $entityManger->getRepository('App:ImgConv');

        $aResponse = $repository->insertValues();

        echo '<pre>';
        print_r($aResponse);
        die;


        $response = new Response(
            json_encode($aResponse, JSON_PRETTY_PRINT)
        );

        $response->headers->set('Content-Type', 'application/json');

        return $response;

    }
}