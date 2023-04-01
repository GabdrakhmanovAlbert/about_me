<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require 'phpmailer/src/Exception.php';
    require 'phpmailer/src/PHPMailer.php';
    require 'phpmailer/src/SMTP.php';

    $mail = new PHPMailer(true);
    $mail->Charset = 'UTF-8';
    $mail->setLanguage('ru', 'phpmailer/language/');
    $mail->IsHTML(true);
    
    // From who
    $mail->setFrom('gabdrakhmanovalbert7@g102.cc', 'Альберт Габдрахманов');
    // whom send
    $mail->addAddress('perkinsokunek@gmail.com');
    // theme
    $mail->Subject = 'Привет! Это Я!';

    $body = "<h1>Письмо, c сайта резюме.</h1>";

    if(trim(!empty($_POST['name']))) {
        $body.='<p><strong>Имя:</strong>'.$_POST['name'].'</p>';
    }
    if(trim(!empty($_POST['email']))){
        $body.='<p><strong>E-mail:</strong>'.$_POST['email'].'</p>';
    }
    if(trim(!empty($_POST['message']))){
        $body.='<p><strong>Сообщение:</strong>'.$_POST['message'].'</p>';
    }

    $mail->Body = $body;

    if (!$mail->send()) {
        $message = 'Error in sendmail.php';
    } else {
        $message = 'Письмо успешно отправлено!';
    }

    $response = ['message' => $message];

    header('Content-type: application/json');
    echo json_encode($response);
