<?php

if (isset($_GET['email'])){
  $email_to = "megymegs@gmail.com";
  $email_subject = "Contacting regarding Web Dev";

  function died($error){
    echo "Unfortunately you missed something";
    echo "Please correct the following";
    echo $error. "<br><br>";
    die();
  }

  if (!isset($_GET['first_name']) ||
  !isset($_GET['last_name']) ||
  !isset($_GET['email']) ||
  !isset($_GET['message'])){
    died("Unfortunately you missed something");
  }

  $first_name = $_GET['first_name']; //required
  $last_name = $_GET['last_name']; //required
  $email = $_GET['email']; //required
  $message = $_GET['message']; //required

  $error_message = "";
  $email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-09.-]+\.[A-Za-z]{2,4}$/';

  if (!preg_match($email_exp, $email_from)){
    $error_message .= 'Invalid email address, please check email address. <br>';
  }

  $string_exp = "/^[A-Za-z .'-]+$/";
  if (!preg_match($string_exp, $first_name)){
    $error_message .= 'Invalid first name, please check spelling. <br>';
  }

  if (!preg_match($string_exp, $last_name)){
    $error_message .= 'Invalid last name, please check spelling. <br>';
  }

  if (strlen($message) <2 ){
    $error_message .= "Invalid message, too short";
  }

  if (strlen($error_message) >0 ){
    died($error_message);
  }

  $email_message = "Form details below.\n\n";

  function clean_string($string){
    $bad = array ("content-type", "bcc:", "cc:", "href");
    return str_replace($bad, "", $string);
  }

  $email_message .="First Name: ". clean_string($first_name)."\n";
  $email_message .="Last Name: ". clean_string($last_name)."\n";
  $email_message .="Email: ". clean_string($email_from)."\n";
  $email_message .="Message: ". clean_string($message)."\n";

  $headers = "From: ".$email_from."\r\n".
  "Reply-To: ". $email_from. "\r\n".
  "X-Mailer: PHP/" . phpversion();
  @email($email_to, $email_subject, $email_message, $headers);

  ?>
  Thank you for contacting me, I will be in touch soon.

  <?php
}
?>
