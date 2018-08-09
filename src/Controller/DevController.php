<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use App\Service\ImageConversion;

class DevController extends AbstractController
{
    /**
     * @Route("/form", name="form")
     * @return Response
     * @throws \Exception
     */
    public function defaultForm()
    {
        return $this->render('form.html.twig', array());
    }

    /**
     * @Route("/form/convert", name="formConvert")
     * @return Response
     * @throws \Exception
     */
    public function formConvert()
    {

        if(isset($_POST['btn_upload'])) {
            echo "<pre>";
            print_r($_FILES);
            die;
        }

    }
}