<?php
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_FILES["note"])) {
    $target_dir = "notes/";
    $target_file = $target_dir . basename($_FILES["note"]["name"]);

    if (move_uploaded_file($_FILES["note"]["tmp_name"], $target_file)) {
        echo "The file ". htmlspecialchars($_FILES["note"]["name"]) . " has been uploaded.";
    } else {
        echo "Sorry, there was an error uploading your file.";
    }
}
?>
